import { OnInit, Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators,
	ReactiveFormsModule,
	FormArray,
	ValidatorFn,
	AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobAd } from '../../job-ad.models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ErrorService } from '@services/error.service';

@Component({
	selector: 'app-job-form',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule,
		MatFormFieldModule,
		MatInputModule,
		MatCardModule,
		MatCheckboxModule,
		MatSelectModule,
		MatRadioModule,
		MatIconModule,
		MatButtonModule,
	],
	templateUrl: './job-form.component.html',
	styleUrl: './job-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobFormComponent implements OnInit {
	@Output() save = new EventEmitter<JobAd>();
	@Output() cancel = new EventEmitter<void>();
	errorMessageSubscription: Subscription[] = [];
	draftDissabled = false;
	archiveHidden = true;
	publishDissabled = true;

	constructor(private fb: FormBuilder, private errorService: ErrorService) {}

	private id: string | undefined;
	@Input() set jobAd({ id, title, description, skills, status }: JobAd) {
		this.id = id;
		const controlArray = this.jobAdForm.get('skills') as FormArray;
		skills.forEach((skill) => {
			controlArray.push(new FormControl(skill, Validators.required));
		});
		this.jobAdForm.patchValue({ title, description });
	}

	jobAdForm: FormGroup = new FormGroup({
		title: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required],
		}),
		description: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.minLength(10)],
		}),
		skills: new FormArray<FormGroup<string>>([], this.minLength(1)),
	});

	ngOnInit(): void {
		const errorSubscriber = this.errorService.errorMessage$.subscribe(() => {
			this.jobAdForm.patchValue({ title: '' });
		});

		this.errorMessageSubscription.push(errorSubscriber);
	}

	onSave(): void {
		const userFormValue = this.jobAdForm.getRawValue();

		this.save.emit({
			...userFormValue,
			...(this.id && { id: this.id }),
		});
	}

	onCancel(): void {
		this.cancel.emit();
	}

	addSkill(): void {
		const control = new FormControl('', Validators.required);
		(this.jobAdForm.get('skills') as FormArray).push(control);
	}

	removeSkill(index: number): void {
		(this.jobAdForm.get('skills') as FormArray).removeAt(index);
	}

	minLength(min: number): ValidatorFn | any {
		return (control: AbstractControl[]) => {
			if (!(control instanceof FormArray)) return;
			return control.length < min ? { minLength: true } : null;
		};
	}

	get skills() {
		return this.jobAdForm.controls['skills'] as FormArray;
	}

	ngOnDestroy() {
		this.errorMessageSubscription.forEach((subscription) => subscription.unsubscribe());
	}
}
