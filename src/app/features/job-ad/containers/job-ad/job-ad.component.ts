import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as JobActions from "@store/actions";
import { CommonModule, NgFor } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { JobAd, JobAdDto } from "../../job-ad.models";
import { MatButtonModule } from "@angular/material/button";
import { AppState } from "@store//store";
import { Observable } from "rxjs";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
	selector: "app-job-ad",
	standalone: true,
	imports: [
		CommonModule,
		NgFor,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		MatIconModule,
		MatButtonModule,
		MatSlideToggleModule,
		MatTooltipModule,
	],
	providers: [],
	templateUrl: "./job-ad.component.html",
	styleUrl: "./job-ad.component.scss",
})
export class JobAdComponent implements OnInit {
	jobs$: Observable<JobAd[]> = this.store.select((state) => state.job.jobs);

	displayedColumns: string[] = [
		"title",
		"description",
		"skills",
		"status",
		"actions",
	];
	dataSource: MatTableDataSource<JobAd> = new MatTableDataSource<JobAd>([]);
	component: any;

	constructor(private store: Store<AppState>, private router: Router) {}

	ngOnInit(): void {
		this.jobs$ = this.store.select((state) => state.job.jobs);
		this.jobs$.subscribe((jobs) => {
			this.dataSource.data = jobs;
		});
	}

	applyFilter(event: Event): void {
		const inputValue = (event.target as HTMLInputElement).value
			.trim()
			.toLowerCase();
		this.dataSource.filterPredicate = (
			data: JobAd,
			filterValue: string
		) => {
			return (
				data.title?.toLowerCase().includes(filterValue) ||
				data.description?.toLowerCase().includes(filterValue) ||
				data.skills?.some((skill) =>
					skill?.toLowerCase().includes(filterValue)
				) ||
				data.status?.toLowerCase().includes(filterValue) ||
				false
			);
		};
		this.dataSource.filter = inputValue;
	}

	startCreating() {
		this.router.navigate(["/job/create"]);
	}

	startEditing(id: string) {
		this.router.navigate(["/job/" + id]);
	}

	startDeleting(id: string) {
		const confirmation = prompt("Are you sure ?");
		if (confirmation) {
			this.store.dispatch(JobActions.deleteJob({ id }));
		}
	}

	toggleChanged(jobAd: any) {
		const nextStatus = this.setStatus(jobAd.status);
		const confirmation = prompt(
			`Do you want to change status to ${nextStatus} ?`
		);
		if (confirmation) {
			const jobWithDefaults: JobAdDto = {
				...jobAd,
				updatedAt: new Date(),
				status: nextStatus,
			};

			this.store.dispatch(JobActions.updateJob({ job: jobWithDefaults }));
		}
	}

	setStatus(status: string) {
		switch (status) {
			case "draft":
				return "published";
			case "published":
				return "archived";
			default:
				return "";
		}
	}
}
