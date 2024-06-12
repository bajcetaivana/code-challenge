import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import * as JobActions from "./actions";
import { JobAdService } from "../services/job-ad.service";
import { JobAd } from "@app/features/job-ad/job-ad.models";
import { InvoiceService } from "@app/services/invoice.service";
import { InvoiceCreate } from "@app/features/invoice/invoice.model";
import { Router } from "@angular/router";

@Injectable()
export class JobEffects {
	loadJobs$ = createEffect(() =>
		this.actions$.pipe(
			ofType(JobActions.loadJobs),
			mergeMap(() =>
				this.jobService.getAll().pipe(
					map((jobs) => JobActions.loadJobsSuccess({ jobs })),
					catchError((error) =>
						of(JobActions.loadJobsFailure({ error: error.message }))
					)
				)
			)
		)
	);

	updateJob$ = createEffect(() =>
		this.actions$.pipe(
			ofType(JobActions.updateJob),
			mergeMap((action) => {
				return this.jobService.update(action.job).pipe(
					mergeMap((updatedJob) => {
						const actions = [
							JobActions.updateJobSuccess({ job: updatedJob }),
						];
						return actions;
					}),
					catchError((error) => {
						console.log("error", error);
						return of(JobActions.updateJobFailure({ error }));
					})
				);
			})
		)
	);

	onUpdateJobSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(JobActions.updateJobSuccess),
			mergeMap((action) => {
				const jobAd: JobAd = action.job;
				if (jobAd.status === "published") {
					const publishedDate = new Date();
					const invoice = this.generateInvoiceBody(
						jobAd.id,
						publishedDate
					);
					return this.invoiceService.create(invoice).pipe(
						map(() => {
							return JobActions.createInvoiceSuccess({ invoice });
						}),
						catchError((error) => {
							console.error("Error creating invoice:", error);
							return of(
								JobActions.createInvoiceFailure({ error })
							);
						})
					);
				}
				this.router.navigateByUrl("/job");
				return of({ type: "NO_ACTION" });
			})
		)
	);

	addJob$ = createEffect(() =>
		this.actions$.pipe(
			ofType(JobActions.addJob),
			mergeMap(() => {
				this.router.navigateByUrl("/job");
				return of({ type: "NO_ACTION" });
			})
		)
	);

	deleteJob$ = createEffect(() =>
		this.actions$.pipe(
			ofType(JobActions.deleteJob),
			mergeMap((action) =>
				this.jobService.delete(action.id).pipe(
					mergeMap(() => {
						const deleteJobSuccessAction =
							JobActions.deleteJobSuccess({ id: action.id });
						return this.invoiceService
							.getInvoiceIdByJobAdId(action.id)
							.pipe(
								mergeMap((invoice) => {
									if (invoice) {
										return this.invoiceService
											.delete(invoice[0].id)
											.pipe(
												map(() =>
													JobActions.deleteInvoiceSuccess(
														{ id: action.id }
													)
												),
												catchError((error) =>
													of(
														JobActions.deleteInvoiceFailure(
															{ error }
														)
													)
												)
											);
									} else {
										return of(deleteJobSuccessAction);
									}
								}),
								catchError((error) => {
									console.error(
										"Error deleting invoice:",
										error
									);
									return of(
										JobActions.deleteInvoiceFailure({
											error,
										})
									);
								})
							);
					}),
					catchError((error) =>
						of(JobActions.deleteJobFailure({ error }))
					)
				)
			)
		)
	);

	deleteInvoice$ = createEffect(() =>
		this.actions$.pipe(
			ofType(JobActions.deleteInvoice),
			mergeMap((action) =>
				this.invoiceService.deleteByJobAdId(action.jobId).pipe(
					map(() => {}),
					catchError((error) => of(error))
				)
			)
		)
	);

	private generateInvoiceBody(
		jobAdId: string,
		publishedDate: Date
	): InvoiceCreate {
		const dueDate = new Date(publishedDate);
		dueDate.setMonth(dueDate.getMonth() + 2);
		dueDate.setDate(0);

		return {
			updatedAt: new Date(),
			createdAt: new Date(),
			jobAdId,
			amount: 100,
			dueDate,
		};
	}

	constructor(
		private actions$: Actions,
		private jobService: JobAdService,
		private invoiceService: InvoiceService,
		private router: Router
	) {}
}
