import { Action, ActionReducer } from '@ngrx/store';
import { jobReducer, JobState } from './reducers';
import { JobEffects } from './effects';

export interface AppState {
	job: JobState;
	updateSuccess: boolean;
	addSuccess: boolean;
	deleteSuccess: boolean;
}

export interface AppStore {
	job: ActionReducer<JobState, Action>;
}

export const appStore: AppStore = {
	job: jobReducer,
};

export const appEffects = [JobEffects];
