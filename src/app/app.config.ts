import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environments } from './environments/environments';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getAuth, provideAuth } from '@angular/fire/auth';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),
    provideFirebaseApp(() => initializeApp(environments.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideHttpClient(withFetch()), 
    importProvidersFrom(
      AngularFireModule.initializeApp(environments.firebaseConfig), 
      BrowserAnimationsModule
    ),
    provideAuth(() => getAuth())
  ]
};
