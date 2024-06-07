export interface JobAd {
	id: string;
	title: string;
	description: string;
	skills: string[];
	status?: JobAdStatus;
}

export enum JobAdStatus {
	Draft = 'draft',
	Published = 'published',
	Archived = 'archived',
}

export interface JobAdDto extends JobAd {
	createdAt: Date;
	updatedAt: Date;
	status: JobAdStatus
}

export interface JobAdDtoDerivate extends Omit<JobAdDto, 'createdAt'> {}
