import { Injectable } from "@angular/core";
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse,
	HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ToastrInterceptor implements HttpInterceptor {
	constructor(private toastr: ToastrService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					if (req.method !== "GET") {
						this.handleSuccessResponse(event, req);
					}
				}
				return event;
			}),
			catchError((error: HttpErrorResponse) => {
				if (error.status === 400) {
					this.toastr.error("Bad request", "Error");
				} else if (error.status === 401) {
					this.toastr.error("Unauthorized", "Error");
				} else if (error.status === 404) {
					this.toastr.error("Not found", "Error");
				} else if (error.status === 500) {
					this.toastr.error("Internal server error", "Error");
				} else {
					this.toastr.error("Something went wrong", "Error");
				}
				return throwError(error);
			})
		);
	}

	private handleSuccessResponse(
		event: HttpResponse<any>,
		req: HttpRequest<any>
	) {
		const method = req.method;
		const url = req.url;
		const body = event.body;
		const jobsRequest = url.includes("/jobs");
		const invoiceRequest = url.includes("/invoices");

		switch (method) {
			case "POST":
				if (jobsRequest) {
					this.toastr.success(
						`Job "${body.title}" created successfully!`,
						"Success"
					);
				} else if (invoiceRequest) {
					this.toastr.success(
						`Invoice with "${body.jobAdId}" job number created successfully!`,
						"Success"
					);
				}
				break;
			case "PUT":
				if (jobsRequest) {
					this.toastr.success(
						`Job "${body.title}" updated successfully!`,
						"Success"
					);
				}
				break;
			case "DELETE":
				if (jobsRequest) {
					this.toastr.success(
						`Job with "${body.title}" deleted successfully!`,
						"Success"
					);
				} else if (invoiceRequest) {
					this.toastr.success(
						`Invoice with "${body.jobAdId}" job number deleted successfully!`,
						"Success"
					);
				}
				break;
			default:
				this.toastr.success("Request successful", "Success");
				break;
		}
	}
}
