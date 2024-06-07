import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Invoice } from '../../invoice.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-invoice-item',
	standalone: true,
	imports: [CommonModule, MatCardModule, MatIconModule],
	templateUrl: './invoice-item.component.html',
	styleUrl: './invoice-item.component.scss',
})
export class InvoiceItemComponent {
	@Input()
	invoice!: Invoice;
}
