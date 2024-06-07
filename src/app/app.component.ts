import { Component } from '@angular/core';
import { JobAdComponent } from './features/job-ad/containers/job-ad/job-ad.component';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		JobAdComponent,
		RouterOutlet,
		RouterLink,
		RouterModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatSidenavModule,
		MatListModule,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'angular-job-ads-app';
	opened = false;
}
