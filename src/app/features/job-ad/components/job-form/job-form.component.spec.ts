import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobFormComponent } from './job-form.component';
import { FormArray } from '@angular/forms';

describe('JobFormComponent', () => {
	let component: JobFormComponent;
	let fixture: ComponentFixture<JobFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [JobFormComponent, BrowserAnimationsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(JobFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize the form with empty values', () => {
		expect(component.jobAdForm.value).toEqual({
			title: '',
			description: '',
			skills: [],
		});
	});

	it('should set job advertisement data using jobAd input', () => {
		const jobAdData = {
			id: '1',
			title: 'Test Job',
			description: 'Test Description',
			skills: ['Skill 1', 'Skill 2'],
		};
		component.jobAd = jobAdData;
		fixture.detectChanges();
		expect(component.jobAdForm.value).toEqual({
			title: 'Test Job',
			description: 'Test Description',
			skills: ['Skill 1', 'Skill 2'],
		});
	});

	it('should add a skill to the form', () => {
		component.addSkill();
		const skillsArray = component.jobAdForm.get('skills') as FormArray;
		expect(skillsArray.length).toBe(1);
	});

	it('should remove a skill from the form', () => {
		component.addSkill();
		component.removeSkill(0);
		const skillsArray = component.jobAdForm.get('skills') as FormArray;
		expect(skillsArray.length).toBe(0);
	});

	it('should emit save event when onSave is called', () => {
		spyOn(component.save, 'emit');
		component.onSave();
		expect(component.save.emit).toHaveBeenCalled();
	});

	it('should emit cancel event when onCancel is called', () => {
		spyOn(component.cancel, 'emit');
		component.onCancel();
		expect(component.cancel.emit).toHaveBeenCalled();
	});
});
