import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { CustomCalendarComponent } from './components/custom-calendar/custom-calendar.component';
import { LibBookmarkIconComponent } from './components/lib-bookmark-icon/lib-bookmark-icon.component';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    declarations: [
        CustomCalendarComponent,
        LibBookmarkIconComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        CalendarModule,
        TranslocoModule
    ],
    exports: [
        CustomCalendarComponent,
        LibBookmarkIconComponent,
        TranslocoModule
    ]
})
export class CustomLibModule { }