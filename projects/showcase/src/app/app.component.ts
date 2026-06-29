import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AccordionModule } from 'primeng/accordion';
import { IntegrationShowcaseComponent } from './integration-showcase/integration-showcase.component';
import { CustomLibModule } from 'custom-lib';

@Component({
  selector: 'app-root',
  // imports: [
  //   AccordionModule,
  //   IntegrationShowcaseComponent,
  //   CustomLibModule
  // ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent {
  title = 'showcase';
}
