# AngularJobAdsApp

Angular • NGRX • RxJS • TypeScript • Angular Material • SCSS • SPA - frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Task comments

-   Changes to the JobAd Interface

In the original JobAd interface provided, the id property was defined as a number. However, due to compatibility issues with the JSON server used in the project, it was necessary to change the id property to a string.

-   NGRX Store

Store is integrated into the Job Ad feature because it required more interaction and underwent frequent changes. On the other hand, for Invoices NGRX was not utilized since the requirement was simpler – just displaying a list of them.

-   Angular Material

UI components leverage Angular material library as resource.

-   Instructions

Starting and testing the app is done by default Angular cli command

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
