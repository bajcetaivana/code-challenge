import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { JobAdCreateComponent } from "./job-ad-create.component";
import { JobAdService } from "@app/services/job-ad.service";
import { Subject, of } from "rxjs";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { ErrorService } from "@app/services/error.service";
import { selectJobTitles } from "@store/selectors";
import * as JobActions from "@store/actions";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JobAdStatus } from "../../job-ad.models";

describe("JobAdCreateComponent", () => {
	let component: JobAdCreateComponent;
	let fixture: ComponentFixture<JobAdCreateComponent>;
	let errorMessageSubject: Subject<string>;
	const mockJobAd = {
		id: "1",
		title: "Test Job",
		description: "Test Description",
		skills: ["awesome skill"],
		updatedAt: jasmine.any(Date),
		createdAt: jasmine.any(Date),
		status: JobAdStatus.Draft,
	};

	const mockRouter = {
		navigateByUrl: jasmine.createSpy("navigateByUrl"),
	};

	const mockStore = {
		dispatch: jasmine.createSpy("dispatch"),
		select: jasmine
			.createSpy("select")
			.and.returnValue(of(["title1", "title2"])),
	};

	const mockJobAdService = {
		create: jasmine.createSpy("create").and.returnValue(of(mockJobAd)),
	};

	const mockToastrService = {
		success: jasmine.createSpy("success"),
		error: jasmine.createSpy("error"),
	};

	let mockErrorService: jasmine.SpyObj<ErrorService>;

	beforeEach(async () => {
		errorMessageSubject = new Subject<string>();
		mockErrorService = jasmine.createSpyObj(
			"ErrorService",
			["emitErrorMessage"],
			{
				errorMessage$: errorMessageSubject.asObservable(),
			}
		);
		await TestBed.configureTestingModule({
			imports: [
				JobAdCreateComponent,
				StoreModule.forRoot({}),
				BrowserAnimationsModule,
			],
			providers: [
				{ provide: Store, useValue: mockStore },
				{ provide: JobAdService, useValue: mockJobAdService },
				{ provide: ToastrService, useValue: mockToastrService },
				{ provide: ErrorService, useValue: mockErrorService },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(JobAdCreateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	afterEach(() => {
		mockJobAdService.create.calls.reset();
		mockStore.dispatch.calls.reset();
		mockErrorService.emitErrorMessage.calls.reset();
		mockToastrService.error.calls.reset();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
		expect(mockStore.select).toHaveBeenCalledWith(selectJobTitles);
	});

	it("should handle job creation with duplicate title", () => {
		const jobAd = {
			id: "1",
			title: "title1",
			description: "Test Description",
			skills: ["awesome skill"],
		};

		component.onCreate(jobAd);

		expect(mockJobAdService.create).not.toHaveBeenCalled();
		expect(mockStore.dispatch).not.toHaveBeenCalled();
		expect(mockErrorService.emitErrorMessage).toHaveBeenCalled();
		expect(mockToastrService.error).toHaveBeenCalled();
	});

	it("should handle job creation successfully", () => {
		component.onCreate(mockJobAd);
		expect(mockJobAdService.create).toHaveBeenCalledWith(mockJobAd);
		expect(mockStore.dispatch).toHaveBeenCalledWith(
			JobActions.addJob({ job: mockJobAd })
		);
		expect(mockErrorService.emitErrorMessage).not.toHaveBeenCalled();
		expect(mockToastrService.error).not.toHaveBeenCalled();
	});
});
