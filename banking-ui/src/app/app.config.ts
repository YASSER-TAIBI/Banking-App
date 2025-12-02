import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { withDefaultRegisterables } from 'ng2-charts';

import { routes } from './app.routes';
import { HttpInterceptorService } from './services/http-interceptor/http-interceptor.service';
import { ApiConfiguration } from './services/api-configuration';
import { provideCharts } from 'ng2-charts';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: ApiConfiguration,
      useValue: { rootUrl: 'http://localhost:8080' } as ApiConfiguration
    },
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  ]
};
