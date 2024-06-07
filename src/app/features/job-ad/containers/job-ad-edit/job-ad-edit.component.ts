import { Component } from "@angular/core";
import { JobFormComponent } from "../../components/job-form/job-form.component";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, switchMap, tap } from "rxjs";
import { JobAd, JobAdDtoDerivate, JobAdStatus } from "../../job-ad.models";
import { Store } from "@ngrx/store";
import { AppState } from "@store/store";
import * as JobActions from "@store/actions";
import { selectJobById, selectUpdateSuccess } from "@store/selectors";
import { ErrorService } from "@app/services/error.service";
import { ToastrService } from "ngx-toastr";

@Component({
	selector: "app-job-ad-edit",
	standalone: true,
	imports: [JobFormComponent, CommonModule],
	templateUrl: "./job-ad-edit.component.html",
	styleUrl: "./job-ad-edit.component.scss",
})
export class JobAdEditComponent {
	selectUpdateSuccess$: Observable<boolean>;
	jobs$: Observable<JobAd[]> = this.store.select((state) => state.job.jobs);

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private store: Store<AppState>,
		private errorService: ErrorService,
		private toastr: ToastrService
	) {
		this.selectUpdateSuccess$ = this.store.select(selectUpdateSuccess);
	}

	jobAd: JobAd | undefined;
	isSaving = false;
	jobsTitleIds!: Array<{ id: string; title: string }>;

	ngOnInit() {
		this.activatedRoute.params
			.pipe(
				switchMap((params) =>
					this.store.select(selectJobById(params["id"]))
				),
				tap((jobAd) => {
					this.jobAd = jobAd;
					if (!jobAd) {
						this.router.navigateByUrl("/job");
					}
				})
			)
			.subscribe();

		this.jobs$.subscribe((res) => {
			this.jobsTitleIds = res.map(({ id, title }) => ({
				id,
				title,
			}));
		});
	}

	onSave(jobAd: JobAd): void {
		this.isSaving = true;

		const existingItem = this.jobsTitleIds.find(
			(item: { title: any; id: any }) =>
				item.title === jobAd.title && item.id !== jobAd.id
		);
		if (existingItem) {
			this.errorService.emitErrorMessage();
			this.toastr.error("Title must be unique");
			return;
		}

		const jobWithDefaults: JobAdDtoDerivate = {
			...jobAd,
			updatedAt: new Date(),
			status: jobAd.status || JobAdStatus.Draft,
		};

		this.store.dispatch(JobActions.updateJob({ job: jobWithDefaults }));
	}

	onCancel(): void {
		this.router.navigateByUrl("/job");
	}
}
