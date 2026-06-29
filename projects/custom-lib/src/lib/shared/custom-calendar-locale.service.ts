import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({ providedIn: 'root' })
export class CalendarLocaleService {

  constructor(private transloco: TranslocoService) {}

  getLocale() {
    const lang = this.transloco.getActiveLang();

    if (lang === 'es') {
      return {
        firstDayOfWeek: 1,
        dayNames: [
          'domingo','lunes','martes','miércoles','jueves','viernes','sábado'
        ],
        dayNamesShort: ['dom','lun','mar','mié','jue','vie','sáb'],
        monthNames: [
          'enero','febrero','marzo','abril','mayo','junio',
          'julio','agosto','septiembre','octubre','noviembre','diciembre'
        ],
        monthNamesShort: [
          'ene','feb','mar','abr','may','jun',
          'jul','ago','sep','oct','nov','dic'
        ],
        today: 'Hoy',
        clear: 'Limpiar'
      };
    }

    // default EN
    return {
      firstDayOfWeek: 0,
      dayNames: [
        'Stunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'
      ],
      dayNamesShort: ['Stun','Mon','Tue','Wed','Thu','Fri','Sat'],
      monthNames: [
        'January','February','March','April','May','June',
        'July','August','September','October','November','December'
      ],
      monthNamesShort: [
        'Jan','Feb','Mar','Apr','May','Jun',
        'Jul','Aug','Sep','Oct','Nov','Dec'
      ],
      today: 'Today',
      clear: 'Clear'
    };
  }
}