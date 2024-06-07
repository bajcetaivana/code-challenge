import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { JobAd, JobAdDtoDerivate } from "../features/job-ad/job-ad.models";

@Injectable({
	providedIn: "root",
})
export class JobAdService {
	private apiUrl = "http://localhost:3000/jobs";

	constructor(private http: HttpClient) {}

	getAll(): Observable<JobAd[]> {
		return this.http.get<JobAd[]>(this.apiUrl);
	}

	getById(id: number): Observable<JobAd> {
		return this.http.get<JobAd>(`${this.apiUrl}/${id}`);
	}

	delete(jobAdId: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${jobAdId}`);
	}

	create(jobAd: JobAd): Observable<any> {
		return this.http.post(`${this.apiUrl}`, jobAd);
	}

	update(jobAd: JobAdDtoDerivate): Observable<JobAd> {
		return this.http.put<JobAd>(`${this.apiUrl}/${jobAd.id}`, jobAd);
	}
}
