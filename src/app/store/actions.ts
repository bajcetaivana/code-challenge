import { createAction, props } from "@ngrx/store";
import { JobAd, JobAdDtoDerivate } from "../features/job-ad/job-ad.models";
import { InvoiceCreate } from "@app/features/invoice/invoice.model";

export const loadJobs = createAction("[Job] Load Jobs");
export const loadJobsSuccess = createAction(
	"[Job] Load Jobs Success",
	props<{ jobs: JobAd[] }>()
);
export const loadJobsFailure = createAction(
	"[Job] Load Jobs Failure",
	props<{ error: string }>()
);
export const addJob = createAction("[Job] Add Job", props<{ job: JobAd }>());
export const addJobSuccess = createAction(
	"[Job] Add Job Success",
	props<{ job: JobAd }>()
);
export const addJobFailure = createAction(
	"[Job] Add Job Failure",
	props<{ error: any }>()
);
export const updateJob = createAction(
	"[Job] Update Job",
	props<{ job: JobAdDtoDerivate }>()
);
export const updateJobSuccess = createAction(
	"[Job] Update Job Success",
	props<{ job: JobAd }>()
);
export const updateJobFailure = createAction(
	"[Job] Update Job Failure",
	props<{ error: any }>()
);
export const deleteJob = createAction(
	"[Job] Delete Job",
	props<{ id: string }>()
);
export const deleteJobSuccess = createAction(
	"[Job] Delete Job Success",
	props<{ id: string }>()
);
export const deleteJobFailure = createAction(
	"[Job] Delete Job Failure",
	props<{ error: any }>()
);
export const createInvoiceSuccess = createAction(
	"[Invoice] Add Job Success",
	props<{ invoice: InvoiceCreate }>()
);
export const createInvoiceFailure = createAction(
	"[Invoice] Add Job Failure",
	props<{ error: any }>()
);
export const deleteInvoice = createAction(
	"[Invoice] Delete Invoice",
	props<{ jobId: string }>()
);
export const deleteInvoiceSuccess = createAction(
	"[Invoice] Delete Invoice Success",
	props<{ id: string }>()
);
export const deleteInvoiceFailure = createAction(
	"[Invoice] Delete Invoice Failure",
	props<{ error: any }>()
);
