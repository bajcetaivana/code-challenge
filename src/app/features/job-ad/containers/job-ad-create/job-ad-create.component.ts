import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { JobFormComponent } from "../../components/job-form/job-form.component";
import { JobAd, JobAdDto, JobAdStatus } from "../../job-ad.models";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "@store/store";
import { Observable, Subscription, of } from "rxjs";
import { selectJobTitles } from "@store/selectors";
import { catchError, mergeMap } from "rxjs/operators";
import * as JobActions from "@store/actions";
import { ErrorService } from "@app/services/error.service";
import { JobAdService } from "@app/services/job-ad.service";
import { ToastrService } from "ngx-toastr";

@Component({
	selector: "app-job-ad-create",
	standalone: true,
	imports: [JobFormComponent, CommonModule],
	templateUrl: "./job-ad-create.component.html",
	styleUrl: "./job-ad-create.component.scss",
})
export class JobAdCreateComponent implements OnInit {
	isSaving = false;
	jobTitles$: Observable<string[]>;
	jobsTitles: string[] = [];
	jobTitlesSubscriptions: Subscription[] = [];

	constructor(
		private router: Router,
		private store: Store<AppState>,
		private errorService: ErrorService,
		private jobAdService: JobAdService,
		private toastr: ToastrService
	) {
		this.jobTitles$ = this.store.select(selectJobTitles);
	}

	ngOnInit(): void {
		const jobTitlesSubscription = this.jobTitles$.subscribe((res) => {
			this.jobsTitles = res;
		});

		this.jobTitlesSubscriptions.push(jobTitlesSubscription);
	}

	onCreate(jobAd: JobAd): void {
		this.isSaving = true;
		if (this.jobsTitles?.length && this.jobsTitles.includes(jobAd.title)) {
			this.errorService.emitErrorMessage();
			this.toastr.error("Title must be unique");
		} else {
			const jobWithDefaults: JobAdDto = {
				...jobAd,
				updatedAt: new Date(),
				createdAt: new Date(),
				status: JobAdStatus.Draft,
			};
			this.jobAdService
				.create(jobWithDefaults)
				.pipe(
					mergeMap((res) => [
						this.store.dispatch(JobActions.addJob({ job: res })),
					]),
					catchError((error) =>
						of(JobActions.addJobFailure({ error: error.message }))
					)
				)
				.subscribe();
		}
	}

	onCancel() {
		this.router.navigateByUrl("/job");
	}

	ngOnDestroy() {
		this.jobTitlesSubscriptions.forEach((subscription) =>
			subscription.unsubscribe()
		);
	}
}
