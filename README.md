# AngularJobAdsApp

Angular • NGRX • RxJS • TypeScript • Angular Material • SCSS • SPA - frontend

## Task comments

-   Changes to the JobAd Interface

In the original JobAd interface provided, the id property was defined as a number. However, due to compatibility issues with the JSON server used in the project, it was necessary to change the id property to a string.

-   NGRX Store

Store is integrated into the Job Ad feature because it required more interaction and underwent frequent changes. On the other hand, for Invoices NGRX was not utilized since the requirement was simpler – just displaying a list of them.

##  Run locally

 - Start json-server :
   `npx json-server --watch ./db.json`
 - Start ng dev server :
   `npx ng serve`


## Running unit tests

Run `npx ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).





https://github.com/bajcetaivana/code-challenge/assets/16049284/1fd8ced9-828a-49be-b729-c1be30bcbd3b




