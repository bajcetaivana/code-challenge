import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ErrorService {
	private errorMessageSubject = new Subject<void>();
	errorMessage$ = this.errorMessageSubject.asObservable();

	emitErrorMessage() {
		this.errorMessageSubject.next();
	}
}
