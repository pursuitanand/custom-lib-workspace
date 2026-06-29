import { Component, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { CustomLibModule } from 'custom-lib';
import {AccordionModule } from 'primeng/accordion';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-integration-showcase',
  //imports: [AccordionModule, CustomLibModule],
  templateUrl: './integration-showcase.component.html',
  styleUrl: './integration-showcase.component.css',
  standalone: false,
})
export class IntegrationShowcaseComponent implements OnInit{
  currentLang: string = 'en';
  constructor(
    private primeNGConfig: PrimeNGConfig,
    private translocoService: TranslocoService
  ) {
    this.currentLang = this.translocoService.getActiveLang();
    this.setCalendarLocale(this.translocoService.getActiveLang());
     this.translocoService.langChanges$.subscribe(lang => {
      this.setCalendarLocale(lang);
    });

    
  }

  form!: FormGroup;

  bookmarkStates: { label: string; filled: boolean }[] = [
    { label: 'Article: Angular Tips', filled: false },
    { label: 'Article: RxJS Patterns', filled: true },
    { label: 'Article: CSS Grid Guide', filled: false },
  ];

  ngOnInit() {
    this.form = new FormGroup({
      date1: new FormControl(null)
    });
  }

  switchLang(lang: string) {
    this.translocoService?.setActiveLang(lang);
  }

  setCalendarLocale(lang: string) {
    if (lang === 'es') {
      this.primeNGConfig.setTranslation({
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
      });
    } else {
      this.primeNGConfig.setTranslation({
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
      });
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
