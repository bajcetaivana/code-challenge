import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { ToastrModule } from "ngx-toastr";
import * as JobActions from "@store/actions";
import { JobAdComponent } from "./job-ad.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppState } from "@app/store/store";
import { Router } from "@angular/router";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { By } from "@angular/platform-browser";
import { JobAd, JobAdStatus } from "../../job-ad.models";

describe("JobAdComponent", () => {
	let component: JobAdComponent;
	let fixture: ComponentFixture<JobAdComponent>;
	let mockStore: MockStore<AppState>;
	let mockRouter: Partial<Router>;
	const mockJobs = [
		{
			id: "1",
			title: "Job 1",
			description: "Description 1",
			skills: ["Skill 1", "Skill 2"],
			status: JobAdStatus.Draft,
		},
		{
			id: "2",
			title: "Job 2",
			description: "Description 2",
			skills: ["Skill 3", "Skill 4"],
			status: JobAdStatus.Published,
		},
	];

	const initialState = {
		job: {
			jobs: mockJobs,
			updateSuccess: false,
		},
	};

	beforeEach(async () => {
		mockRouter = {
			navigate: jasmine.createSpy("navigate"),
		};

		await TestBed.configureTestingModule({
			imports: [
				JobAdComponent,
				ToastrModule.forRoot(),
				BrowserAnimationsModule,
				MatTableModule,
				MatFormFieldModule,
				MatInputModule,
				MatIconModule,
				MatButtonModule,
				MatSlideToggleModule,
				MatTooltipModule,
				MatPaginatorModule,
				MatSortModule,
			],
			providers: [
				provideMockStore({ initialState }),
				{ provide: Router, useValue: mockRouter },
			],
		}).compileComponents();

		mockStore = TestBed.inject(MockStore);
		spyOn(mockStore, "dispatch"); // Make the dispatch method a spy
		const mockDataSource = new MatTableDataSource<JobAd>(mockJobs);
		fixture = TestBed.createComponent(JobAdComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should display the job ads", () => {
		const jobRows = fixture.debugElement.queryAll(By.css(".job-row"));
		expect(jobRows.length).toBe(2);
	});

	it("should start creating a job", () => {
		component.startCreating();
		expect(mockRouter.navigate).toHaveBeenCalledWith(["/job/create"]);
	});

	it("should start editing a job", () => {
		component.startEditing(mockJobs[0].id);
		expect(mockRouter.navigate).toHaveBeenCalledWith([
			"/job/" + mockJobs[0].id,
		]);
	});

	it("should start deleting a job", () => {
		spyOn(window, "prompt").and.returnValue("Yes");
		const jobId = "1";
		component.startDeleting(jobId);
		expect(window.prompt).toHaveBeenCalled();
		expect(mockStore.dispatch).toHaveBeenCalledWith(
			JobActions.deleteJob({ id: jobId })
		);
	});

	it("should not delete a job if confirmation is cancelled", () => {
		spyOn(window, "prompt").and.returnValue(null);
		const jobId = "1";
		component.startDeleting(jobId);
		expect(window.prompt).toHaveBeenCalled();
		expect(mockStore.dispatch).not.toHaveBeenCalled();
	});

	it("should toggle job status", () => {
		spyOn(window, "prompt").and.returnValue("Yes");
		const job = mockJobs[0];
		component.toggleChanged(job);
		expect(window.prompt).toHaveBeenCalled();
		expect(mockStore.dispatch).toHaveBeenCalledWith(
			JobActions.updateJob({
				job: {
					...job,
					status: JobAdStatus.Published,
					updatedAt: new Date(),
				},
			})
		);
	});

	it("should not toggle job status if confirmation is cancelled", () => {
		spyOn(window, "prompt").and.returnValue(null);
		const job = mockJobs[0];
		component.toggleChanged(job);
		expect(window.prompt).toHaveBeenCalled();
		expect(mockStore.dispatch).not.toHaveBeenCalled();
	});
});
