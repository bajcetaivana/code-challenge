import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { jobSelector } from '../store/selectors';
import { AppState } from '../store/store';
import * as JobActions from '../store/actions';

@Injectable({ providedIn: 'root' })
export class JobStoreResolver {
	constructor(private store: Store<AppState>) {}

	resolve(): Observable<any> {
		return this.store.select(jobSelector).pipe(
			take(1),
			tap((items) => {
				if (!items || items.length === 0) {
					this.store.dispatch(JobActions.loadJobs());
				}
			})
		);
	}
}
