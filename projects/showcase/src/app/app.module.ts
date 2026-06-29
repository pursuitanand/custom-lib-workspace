import { CustomLibModule } from 'custom-lib';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IntegrationShowcaseComponent } from './integration-showcase/integration-showcase.component';
import { AppComponent } from './app.component';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoRootModule } from './transloco-root.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        IntegrationShowcaseComponent
    ],
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        CustomLibModule,
        AccordionModule,
        HttpClientModule,
        TranslocoRootModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }