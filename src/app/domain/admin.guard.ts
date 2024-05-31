import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

interface User {
  uid: string;
  nombre: string;
  email: string;
  role: string;
}

export const adminGuard: CanActivateFn = (route, state) => {
  const afAuth = inject(AngularFireAuth);
  const afs = inject(AngularFirestore);
  const router = inject(Router);

  return afAuth.authState.pipe(
    switchMap(user => {
      if (!user) {
        router.navigate(['/login']);
        return of(false);
      }
      return afs.doc<User>(`users/${user.uid}`).valueChanges().pipe(
        map(userDoc => {
          if (!userDoc || userDoc.role !== 'admin') {
            router.navigate(['/dashboard']);
            return false;
          }
          return true;
        })
      );
    })
  ) as Observable<boolean | UrlTree>;
};