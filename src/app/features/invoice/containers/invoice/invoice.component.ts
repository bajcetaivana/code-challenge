import { Component } from '@angular/core';
import { InvoiceService } from '../../../../services/invoice.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InvoiceItemComponent } from '../../components/invoice-item/invoice-item.component';
import { Invoice } from '../../invoice.model';

@Component({
	selector: 'app-invoice',
	standalone: true,
	imports: [CommonModule, InvoiceItemComponent],
	templateUrl: './invoice.component.html',
	styleUrl: './invoice.component.scss',
})
export class InvoiceComponent {
	invoices$!: Observable<Invoice[]>;

	constructor(private invoiceService: InvoiceService) {}

	ngOnInit() {
		this.invoices$ = this.invoiceService.getAll();
	}
}
