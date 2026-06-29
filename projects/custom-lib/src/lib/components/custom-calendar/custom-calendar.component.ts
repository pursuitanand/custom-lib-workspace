import {
  Component,
  Input,
  forwardRef,
  OnInit,
  Injector 
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  NgControl
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TranslocoService } from '@ngneat/transloco';
import { PrimeNGConfig } from 'primeng/api';
import { CalendarLocaleService } from '../../shared/custom-calendar-locale.service';

interface CalendarErrors {
  required?: boolean;
  minDate?: boolean;
  maxDate?: boolean;
}

@Component({
  selector: 'lib-custom-calendar',
  //imports: [],
  templateUrl: './custom-calendar.component.html',
  styleUrl: './custom-calendar.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomCalendarComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomCalendarComponent),
      multi: true
    }
  ],
  standalone: false,
})
export class CustomCalendarComponent implements ControlValueAccessor, OnInit {
  
  constructor(
    private translocoService: TranslocoService,
    private injector: Injector,
    private localeService: CalendarLocaleService,
    private primeNGConfig: PrimeNGConfig
  ) { }
  // INTERNAL VALUE
  value: any;

  ngControl?: NgControl | null;

  // CALLBACKS
  onChange = (_: any) => {};
  onTouched = () => {};

  // STATE
  isDisabled = false;

  // BASIC CONFIG
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() customWidth?: string;
  @Input() size: 'sm' | 'md' | 'lg' | 'full' = 'full';
  @Input() locale: any;

  // DISPLAY
  @Input() showIcon: boolean = true;
  @Input() showTime: boolean = false;
  @Input() hourFormat: string = '24';
  @Input() dateFormat: string = 'mm/dd/yy';
  @Input() inline: boolean = false;

  // SELECTION
  @Input() selectionMode: 'single' | 'multiple' | 'range' = 'single';
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;

  // UI
  @Input() showButtonBar: boolean = false;
  @Input() showOnFocus: boolean = true;
  @Input() touchUI: boolean = false;
  @Input() appendTo: any = null;

  // VALIDATION CONFIG
  @Input() required: boolean = false;
  @Input() enableMinDateValidation: boolean = false;
  @Input() enableMaxDateValidation: boolean = false;

  // LABELS
  @Input() label: string = '';
  @Input() requiredMessage: string = 'validation.required';
  @Input() minDateMessage: string = 'validation.minDate';
  @Input() maxDateMessage: string = 'validation.maxDate';

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    this.primeNGConfig.setTranslation(this.localeService.getLocale());
    // If language changes dynamically:
    // this.transloco.langChanges$.subscribe(() => {
    //   this.primeNGConfig.setTranslation(this.localeService.getLocale());
    // });
    this.setupTranslations();
  }

  get computedWidth(): string {
    if (this.customWidth && this.customWidth.trim()) {
      return this.customWidth;
    }
    switch (this.size) {
      case 'sm': return '180px';
      case 'md': return '260px';
      case 'lg': return '360px';
      default: return '100%';
    }
  }

  // =========================
  // CONTROL VALUE ACCESSOR
  // =========================

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // =========================
  // VALIDATION (ANGULAR FORMS)
  // =========================

  hasError(errorKey: string): boolean {
    const control = this.ngControl?.control;
    return !!control && control.touched && control.hasError(errorKey);
  }

  isInvalid(): boolean {
    const control = this.ngControl?.control;
    return !!control && control.touched && control.invalid;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.value) {
      if (this.required) {
        return { required: true };
      }
      return null;
    }

    if (this.enableMinDateValidation && this.minDate) {
      if (new Date(this.value) < this.minDate) {
        return { minDate: true };
      }
    }

    if (this.enableMaxDateValidation && this.maxDate) {
      if (new Date(this.value) > this.maxDate) {
        return { maxDate: true };
      }
    }

    return null;
  }

  // =========================
  // EVENTS
  // =========================

  onValueChange(value: any) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  // =========================
  // TRANSLATIONS
  // =========================

  setupTranslations() {
    const lang = this.translocoService.getActiveLang();

    if (lang === 'es') {
      this.translocoService.setTranslation({
        validation: {
          required: 'Este campo es obligatorio',
          minDate: 'La fecha es menor al mínimo permitido',
          maxDate: 'La fecha excede el máximo permitido'
        }
      }, 'es', { merge: true });
    }
  }

  getCalendarLocale(lang: string) {
  if (lang === 'es') {
    return {
      firstDayOfWeek: 1,
      dayNames: ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'],
      dayNamesShort: ['dom','lun','mar','mié','jue','vie','sáb'],
      monthNames: [
        'enero','febrero','marzo','abril','mayo','junio',
        'julio','agosto','septiembre','octubre','noviembre','diciembre'
      ],
      monthNamesShort: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'],
      today: 'Hoy',
      clear: 'Limpiar'
    };
  }

  return {
    firstDayOfWeek: 0,
    dayNames: ['Stunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    dayNamesShort: ['Stun','Mon','Tue','Wed','Thu','Fri','Sat'],
    monthNames: [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ],
    monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    today: 'Today',
    clear: 'Clear'
  };
}
}
