import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import {
	HTTP_INTERCEPTORS,
	provideHttpClient,
	withInterceptorsFromDi,
} from "@angular/common/http";
import { provideRouterStore } from "@ngrx/router-store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { appEffects, appStore } from "./store/store";
import { provideToastr } from "ngx-toastr";
import { ToastrInterceptor } from "./services/notifications.interceptor";
import { provideAnimations } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
	providers: [
		provideEffects(appEffects),
		provideHttpClient(withInterceptorsFromDi()),
		provideRouter(routes),
		provideRouterStore(),
		provideStore(appStore),
		provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
		provideToastr(),
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ToastrInterceptor,
			multi: true,
		},
		provideAnimations(),
	],
};
