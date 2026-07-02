# CLAUDE.md — Custom Lib Workspace

## Project overview

Angular 19 monorepo containing a reusable component library (`custom-lib`) and a showcase application (`showcase`) that demonstrates every component the library exports.

## Architecture

```
main.ts → AppModule → AppComponent
                    └─ IntegrationShowcaseComponent
                         └─ CustomLibModule  (the library)
                              ├─ CustomCalendarComponent   (lib-custom-calendar)
                              └─ LibBookmarkIconComponent  (lib-bookmark-icon)
                         └─ PrimeNG modules (AccordionModule, CalendarModule, …)
```

**This workspace does NOT use standalone components.** Every component carries `standalone: false` and is declared in `CustomLibModule`. Do not switch to standalone without updating the module.

## Projects

| Project | Type | Root | Default serve target |
|---|---|---|---|
| `custom-lib` | Library | `projects/custom-lib` | — |
| `showcase` | Application | `projects/showcase` | `ng serve showcase` |

## Key commands

```bash
# Build the library (required before changes are visible in showcase prod build)
ng build custom-lib

# Serve the showcase app (dev — uses the local source directly via tsconfig paths)
ng serve showcase

# Run library unit tests
ng test custom-lib

# Run showcase unit tests
ng test showcase
```

## Library public surface

Exports are declared in `projects/custom-lib/src/public-api.ts`.  
Every new component **must** be added there and to `CustomLibModule` (declarations + exports).

## Components

### `lib-custom-calendar` — CustomCalendarComponent
- **File:** `projects/custom-lib/src/lib/components/custom-calendar/`
- **Purpose:** Wraps PrimeNG `p-calendar` with Angular Forms (CVA), validation, and i18n via Transloco.
- **Inputs:** `id`, `name`, `placeholder`, `size` (`sm|md|lg|full`), `customWidth`, `showIcon`, `showTime`, `hourFormat`, `dateFormat`, `inline`, `selectionMode`, `minDate`, `maxDate`, `showButtonBar`, `showOnFocus`, `touchUI`, `appendTo`, `required`, `enableMinDateValidation`, `enableMaxDateValidation`, `label`, `requiredMessage`, `minDateMessage`, `maxDateMessage`, `locale`
- **Forms:** implements `ControlValueAccessor` + `Validator` — use with `formControlName` or `[(ngModel)]`

### `lib-bookmark-icon` — LibBookmarkIconComponent
- **File:** `projects/custom-lib/src/lib/components/lib-bookmark-icon/`
- **Purpose:** Zero-dependency SVG bookmark icon. Equivalent to PrimeIcons `pi-bookmark` / `pi-bookmark-fill` but built from scratch.
- **Inputs:**
  - `filled: boolean` (default `false`) — outline vs filled state; parent-controlled (see below)
  - `ariaLabel?: string` — overrides auto-generated label ("Add bookmark" / "Remove bookmark")
  - `loading: boolean` (default `false`) — disables interaction while a consumer's backend call is in flight
- **Outputs:**
  - `toggleRequested: EventEmitter<boolean>` — emits the *intended* new filled state when the user requests a toggle. The component does **not** flip `filled` itself; the consumer should perform its backend call and only update the `filled` input once that call succeeds (leave it unchanged on failure).
- **Accessibility:** `role="button"`, `tabindex="0"` (`-1` while `loading`), `aria-pressed`, `aria-busy`/`aria-disabled` while `loading`, SVG `<title>`, keyboard support (Enter / Space), `:focus-visible` ring
- **Styling:** inherits `color` from the parent — set `color` CSS to change both stroke and fill. Size is controlled via CSS `width`/`height` on the host element.

```html
<!-- Toggle confirmed only after the backend call succeeds -->
<lib-bookmark-icon
  [filled]="isSaved"
  [loading]="isSaving"
  (toggleRequested)="onToggleRequested($event)"
/>
```

```ts
onToggleRequested(next: boolean): void {
  this.isSaving = true;
  this.bookmarkApi.setBookmark(next).subscribe({
    next: () => { this.isSaved = next; this.isSaving = false; },
    error: () => { this.isSaving = false; } // filled stays unchanged on failure
  });
}
```

```html
<!-- Custom color and size (static, no backend interaction) -->
<lib-bookmark-icon [filled]="true" style="color: #e74c3c; width: 2rem; height: 2rem;" />
```

## Conventions

- **Selector prefix:** `lib-` for all library components (e.g. `lib-bookmark-icon`, `lib-custom-calendar`).
- **Style files:** use `.css` (not `.scss`). The `styleUrls` array must reference `.css`.
- **No PrimeIcons dependency for icons:** custom icons are SVG-based inside the component template.
- **i18n:** use `@ngneat/transloco` for any user-visible strings inside library components.
- **Showcase demos:** each library component gets its own `p-accordionTab` in `integration-showcase.component.html`.

## Adding a new library component

```bash
# 1. Generate the component files
ng generate component lib/components/my-component --project=custom-lib

# 2. Register in the module
#    projects/custom-lib/src/lib/custom-lib.module.ts
#    → add to declarations[] and exports[]

# 3. Export from the public API
#    projects/custom-lib/src/public-api.ts
#    → export * from './lib/components/my-component/my-component.component';

# 4. Add a demo accordion tab
#    projects/showcase/src/app/integration-showcase/integration-showcase.component.html
```

## Dependencies of note

| Package | Version | Purpose |
|---|---|---|
| `primeng` | ^17 | UI component library (Calendar, Accordion, …) |
| `primeicons` | ^7 | Icon font (available but new icons should be SVG-based) |
| `@ngneat/transloco` | ^6 | Runtime i18n |
| `@angular/animations` | ^19 | Required by PrimeNG |
