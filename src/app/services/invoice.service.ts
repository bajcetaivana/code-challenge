import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice, InvoiceCreate } from '../features/invoice/invoice.model';

@Injectable({
	providedIn: 'root',
})
export class InvoiceService {
	private apiUrl = 'http://localhost:3000/invoices';

	constructor(private http: HttpClient) {}

	getAll(): Observable<Invoice[]> {
		return this.http.get<Invoice[]>(this.apiUrl);
	}

	getById(id: number): Observable<Invoice> {
		return this.http.get<Invoice>(`${this.apiUrl}/${id}`);
	}

	getInvoiceIdByJobAdId(jobAdId: string): Observable<Invoice[]> {
		return this.http.get<Invoice[]>(`${this.apiUrl}?jobAdId=${jobAdId}`);
	}

	deleteByJobAdId(jobAdId: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${jobAdId}`);
	}

	delete(invoiceId: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${invoiceId}`);
	}

	create(invoice: InvoiceCreate): Observable<any> {
		return this.http.post(`${this.apiUrl}`, invoice);
	}
}
