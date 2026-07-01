# CustomLibWorkspace

![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=flat-square&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PrimeNG](https://img.shields.io/badge/PrimeNG-17-4CAF50?style=flat-square&logo=primeng&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-LTS-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-package%20manager-CB3837?style=flat-square&logo=npm&logoColor=white)
![Transloco](https://img.shields.io/badge/Transloco-i18n-blueviolet?style=flat-square)
![License](https://img.shields.io/badge/license-private-lightgrey?style=flat-square)

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


### how to set up this project from scratch
ng new custom-lib-workspace --create-application=false
cd custom-lib-workspace
ng generate library custom-lib
ng generate application showcase
npm install primeng@17 primeicons
npm install @angular/animations
code .
cd projects\custom-lib\src
ng generate component lib/components/custom-calendar --project=custom-lib
custom-lib-workspace\projects\showcase\src\app>ng generate component integration-showcase --project=showcase

## how to Build and run 
ng build custom-lib
ng serve showcase

## Please note it's not standalone.
maint.ts -> AppModule -> AppComponent -> IntegrationShowcaseComponent ->CustomLibModule -> PrimeNG (Accordion, Calendar , your new one , etc)

## Library components

### lib-custom-calendar
Wraps PrimeNG `p-calendar` with Angular Forms (ControlValueAccessor), built-in validation, and Transloco i18n.

```html
<lib-custom-calendar formControlName="date1" label="calendar.label" size="md" [required]="true" [showTime]="true" />
```

### lib-bookmark-icon
Zero-dependency SVG bookmark icon. Drop-in equivalent to PrimeIcons `pi-bookmark` / `pi-bookmark-fill`, built from scratch. Fully accessible (keyboard + screen reader).

```html
<!-- Toggle bookmark -->
<lib-bookmark-icon [filled]="isSaved" (bookmarkChange)="isSaved = $event" />

<!-- Custom color and size via CSS -->
<lib-bookmark-icon [filled]="true" style="color: #e74c3c; width: 2rem; height: 2rem;" />
```

Inputs: `filled: boolean`, `ariaLabel?: string`  
Output: `bookmarkChange: EventEmitter<boolean>`

## Changelog

- **2026-06-30** — Added `lib-bookmark-icon` component (SVG bookmark, fully accessible, zero dependencies).

## Scaffold commands used

```bash
ng generate component lib/components/custom-calendar --project=custom-lib
ng generate component lib/components/lib-bookmark-icon --project=custom-lib
cd projects/showcase/src/app
ng generate component integration-showcase --project=showcase
```