import { NgModule, Injectable } from '@angular/core';
import {
  TranslocoModule,
  provideTransloco,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  translocoConfig,
} from '@ngneat/transloco';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    // {
    //   provide: TRANSLOCO_CONFIG,
    //   useValue: translocoConfig({
    //     availableLangs: ['en', 'es'],
    //     defaultLang: 'en',
    //     reRenderOnLangChange: true
    //   })
    // },
    // {
    //   provide: TRANSLOCO_LOADER,   // ✅ FIX HERE
    //   useClass: TranslocoHttpLoader
    // },
    provideTransloco({
      config: {
        availableLangs: ['en', 'es'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: false
      },
      loader: TranslocoHttpLoader
    })
  ]
})
export class TranslocoRootModule {}