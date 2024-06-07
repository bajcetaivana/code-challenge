import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JobAdService } from './job-ad.service';

describe('JobAdService', () => {
	let service: JobAdService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [JobAdService],
		});
		service = TestBed.inject(JobAdService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
