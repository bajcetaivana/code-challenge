import { createReducer, on } from "@ngrx/store";
import { JobAd } from "../features/job-ad/job-ad.models";
import * as JobActions from "./actions";
export const jobFeatureKey = "job";
export interface JobState {
	updateSuccess: boolean;
	addSuccess: boolean;
	jobs: JobAd[];
	loading: boolean;
	error: string;
}
export const initialState: JobState = {
	jobs: [],
	loading: false,
	error: "",
	updateSuccess: false,
	addSuccess: false,
};
export const jobReducer = createReducer(
	initialState,

	on(JobActions.loadJobs, (state) => ({ ...state, loading: true })),

	on(JobActions.loadJobsSuccess, (state, { jobs }) => ({
		...state,
		jobs,
		loading: false,
	})),

	on(JobActions.loadJobsFailure, (state, { error }) => ({
		...state,
		error,
		loading: false,
	})),

	on(JobActions.addJob, (state, { job }) => ({
		...state,
		jobs: [...state.jobs, job],
	})),
	on(JobActions.addJobSuccess, (state, { job }) => ({
		...state,
		jobs: state.jobs.map((job) => (job.id === job.id ? job : job)),
		addSuccess: true,
	})),

	on(JobActions.updateJob, (state, { job }) => ({
		...state,
	})),

	on(JobActions.updateJobSuccess, (state, { job }) => ({
		...state,
		jobs: state.jobs.map((t) => (t.id === job.id ? job : t)),
		updateSuccess: true,
	})),

	on(JobActions.updateJobFailure, (state, {}) => ({
		...state,
		updateSuccess: false,
	})),

	on(JobActions.deleteJob, (state, { id }) => ({
		...state,
		jobs: state.jobs.filter((t) => t.id !== id),
	}))
);
