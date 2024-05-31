import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutecticationService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private authfirebase: AngularFireAuth,
    private afs: AngularFirestore) { }

    logout() {
      this.afAuth.signOut().then(() => {
        console.log('Sesión cerrada correctamente');
        /*this.toastr.success('Sesión cerrada correctamente', '¡Éxito!');*/
        window.location.href = '/login';
      }).catch((error) => {
        console.error('Error al cerrar sesión:', error);
        /*this.toastr.error('Hubo un error al cerrar la sesión', 'Error');*/
      });
    }
}
