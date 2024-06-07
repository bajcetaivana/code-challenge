import { ComponentFixture, TestBed } from "@angular/core/testing";
import { JobFormComponent } from "../../components/job-form/job-form.component";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, of } from "rxjs";
import { JobAdService } from "@services/job-ad.service";
import { Store, StoreModule } from "@ngrx/store";
import { AppState } from "@store/store";
import { ErrorService } from "@app/services/error.service";
import { ToastrService, ToastrModule } from "ngx-toastr";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import * as JobActions from "@store/actions";

import { JobAdEditComponent } from "./job-ad-edit.component";
import { JobAdStatus } from "../../job-ad.models";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("JobAdEditComponent", () => {
	let component: JobAdEditComponent;
	let fixture: ComponentFixture<JobAdEditComponent>;
	let mockStore: MockStore<AppState>;
	let mockJobAdService: jasmine.SpyObj<JobAdService>;
	let mockErrorService: jasmine.SpyObj<ErrorService>;
	let mockToastrService: jasmine.SpyObj<ToastrService>;
	let mockRouter: jasmine.SpyObj<Router>;
	let mockActivatedRoute: ActivatedRoute;

	const errorMessageSubject: Subject<string> = new Subject<string>();
	const fixedDate = new Date("2024-06-07T12:00:00");
	const mockJobAd = {
		id: "1",
		title: "Test Job",
		description: "Test Job Description",
		updatedAt: fixedDate,
		createdAt: fixedDate,
		status: JobAdStatus.Draft,
		skills: ["special skill"],
	};

	const initialState = {
		job: {
			jobs: [mockJobAd],
			updateSuccess: false,
		},
	};

	beforeEach(async () => {
		mockJobAdService = jasmine.createSpyObj("JobAdService", ["getById"]);
		mockErrorService = jasmine.createSpyObj(
			"ErrorService",
			["emitErrorMessage"],
			{
				errorMessage$: errorMessageSubject.asObservable(),
			}
		);
		mockToastrService = jasmine.createSpyObj("ToastrService", ["error"]);
		mockRouter = jasmine.createSpyObj("Router", ["navigateByUrl"]);
		mockActivatedRoute = {
			params: of({ id: "1" }),
		} as any;

		await TestBed.configureTestingModule({
			imports: [
				JobAdEditComponent,
				CommonModule,
				JobFormComponent,
				ToastrModule.forRoot(),
				BrowserAnimationsModule,
				StoreModule.forRoot({}),
			],
			providers: [
				{ provide: ActivatedRoute, useValue: mockActivatedRoute },
				{ provide: JobAdService, useValue: mockJobAdService },
				{ provide: ErrorService, useValue: mockErrorService },
				{ provide: ToastrService, useValue: mockToastrService },
				{ provide: Router, useValue: mockRouter },
				{
					provide: Store,
					useValue: {
						select: jasmine
							.createSpy()
							.and.returnValue(of(mockJobAd)), // Mocking store select
					},
				},
				provideMockStore({ initialState }),
			],
		}).compileComponents();

		mockStore = TestBed.inject(Store) as MockStore<AppState>;

		fixture = TestBed.createComponent(JobAdEditComponent);
		component = fixture.componentInstance;
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should have job ad defined", () => {
		component.ngOnInit();
		expect(component.jobAd).toEqual(mockJobAd);
	});

	it("should display error if title is not unique", () => {
		component.jobsTitleIds = [{ id: "2", title: "Test Job" }];
		component.onSave(mockJobAd);
		expect(mockErrorService.emitErrorMessage).toHaveBeenCalled();
		expect(mockToastrService.error).toHaveBeenCalledWith(
			"Title must be unique"
		);
	});

	it("should dispatch updateJob action on save", () => {
		const dispatchSpy = spyOn(mockStore, "dispatch");
		component.jobsTitleIds = [{ id: "2", title: "Other Job" }];

		const mockJobAd = {
			id: "1",
			title: "Test Job",
			description: "Test Job Description",
			updatedAt: new Date(),
			status: JobAdStatus.Draft,
			skills: ["special skill"],
		};
		component.onSave(mockJobAd);

		expect(dispatchSpy).toHaveBeenCalledWith(
			JobActions.updateJob({ job: mockJobAd })
		);
	});

	it("should navigate to /job on cancel", () => {
		component.onCancel();
		expect(mockRouter.navigateByUrl).toHaveBeenCalledWith("/job");
	});
});
