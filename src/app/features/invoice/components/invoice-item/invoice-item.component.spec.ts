import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InvoiceItemComponent } from "./invoice-item.component";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { Invoice } from "../../invoice.model";
import { By } from "@angular/platform-browser";

describe("InvoiceItemComponent", () => {
	let component: InvoiceItemComponent;
	let fixture: ComponentFixture<InvoiceItemComponent>;
	const mockData = {
		id: "2",
		jobAdId: "123",
		dueDate: new Date("2024-06-07T04:21:32.000Z"),
		amount: 120,
	};
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				InvoiceItemComponent,
				CommonModule,
				MatCardModule,
				MatIconModule,
			],
		}).compileComponents();

		fixture = TestBed.createComponent(InvoiceItemComponent);
		component = fixture.componentInstance;
		component.invoice = mockData;

		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should display invoice ID", () => {
		const invoiceIdElement = fixture.debugElement.query(
			By.css("mat-card-title")
		).nativeElement;
		expect(invoiceIdElement.textContent).toContain("ID: 2");
	});

	it("should display invoice amount", () => {
		const formattedAmount = `$${mockData.amount
			.toLocaleString("en-US", { style: "currency", currency: "USD" })
			.replace("$", "")}`;
		const invoiceAmountElement = fixture.debugElement.query(
			By.css("mat-card-content")
		).nativeElement;
		expect(invoiceAmountElement.textContent).toContain(
			`AMOUNT: ${formattedAmount}`
		);
	});
});
