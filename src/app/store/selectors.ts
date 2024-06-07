import { createSelector } from '@ngrx/store';
import { JobState } from './reducers';
import { AppState } from './store';

const feature = (state: AppState) => state.job;

export const jobSelector = createSelector(feature, (state: JobState) => state.jobs);

export const selectJobTitles = createSelector(jobSelector, (jobs) => jobs.map((job: { title: string }) => job.title));

export const selectUpdateSuccess = createSelector(feature, (state: JobState) => state.updateSuccess);

export const selectAddSuccess = createSelector(feature, (state: JobState) => state.addSuccess);

export const selectJobById = (id: string) => createSelector(
	feature,
	(state) => state.jobs.find(job => job.id === id)
  );
