import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InvoiceComponent } from "./invoice.component";
import { CommonModule } from "@angular/common";
import { InvoiceItemComponent } from "../../components/invoice-item/invoice-item.component";
import { InvoiceService } from "@app/services/invoice.service";
import { Invoice } from "../../invoice.model";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

describe("InvoiceComponent", () => {
	let component: InvoiceComponent;
	let fixture: ComponentFixture<InvoiceComponent>;
	let invoiceServiceSpy: jasmine.SpyObj<InvoiceService>;

	const mockInvoices: Invoice[] = [
		{
			id: "1",
			jobAdId: "123",
			dueDate: new Date("2024-06-07T04:21:32.000Z"),
			amount: 1500,
		},
		{
			id: "2",
			jobAdId: "234",
			dueDate: new Date("2024-07-08T05:22:33.000Z"),
			amount: 2000,
		},
	];

	beforeEach(async () => {
		const invoiceService = jasmine.createSpyObj("InvoiceService", [
			"getAll",
		]);

		await TestBed.configureTestingModule({
			imports: [CommonModule, InvoiceComponent, InvoiceItemComponent],
			providers: [{ provide: InvoiceService, useValue: invoiceService }],
		}).compileComponents();
		invoiceServiceSpy = TestBed.inject(
			InvoiceService
		) as jasmine.SpyObj<InvoiceService>;

		fixture = TestBed.createComponent(InvoiceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should display a list of invoices", () => {
		invoiceServiceSpy.getAll.and.returnValue(of(mockInvoices));

		component.ngOnInit();
		fixture.detectChanges();

		const invoiceItems = fixture.debugElement.queryAll(
			By.css("app-invoice-item")
		);
		expect(invoiceItems.length).toBe(2);
	});
});
