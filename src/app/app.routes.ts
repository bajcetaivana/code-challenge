import { Routes } from "@angular/router";
import { JobStoreResolver } from "./services/store.resolver";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("./home/home.component").then((m) => m.HomeComponent),
	},
	{
		path: "job",
		loadComponent: () =>
			import("./features/job-ad/containers/job-ad/job-ad.component").then(
				(m) => m.JobAdComponent
			),
		resolve: {
			item: JobStoreResolver,
		},
	},
	{
		path: "job/create",
		loadComponent: () =>
			import(
				"./features/job-ad/containers/job-ad-create/job-ad-create.component"
			).then((m) => m.JobAdCreateComponent),
		resolve: {
			item: JobStoreResolver,
		},
	},
	{
		path: "job/:id",
		loadComponent: () =>
			import(
				"./features/job-ad/containers/job-ad-edit/job-ad-edit.component"
			).then((m) => m.JobAdEditComponent),
		resolve: {
			item: JobStoreResolver,
		},
	},
	{
		path: "invoice",
		loadComponent: () =>
			import(
				"./features/invoice/containers/invoice/invoice.component"
			).then((m) => m.InvoiceComponent),
	},
];
