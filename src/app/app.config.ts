import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { registerLocaleData } from '@angular/common'
import localeFr from '@angular/common/locales/fr'
import { register } from 'swiper/element/bundle'

register()
registerLocaleData(localeFr, 'fr')

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'fr' }
  ]
};
