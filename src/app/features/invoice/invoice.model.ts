export interface Invoice {
	id: string;
	jobAdId: string;
	amount: number;
	dueDate: Date;
}

export interface InvoiceDto extends Invoice {
	createdAt: Date;
	updatedAt: Date;
}

export interface InvoiceCreate extends Omit<Invoice, 'id'> {
	createdAt: Date;
	updatedAt: Date;
}

export interface InvoiceCreateDerivate extends Omit<InvoiceCreate, 'createdAt'> {}
