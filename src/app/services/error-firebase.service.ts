import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorFirebaseService {

  constructor() { }

  codeError(code:string){
    switch(code){
      //usuario existe
      case 'auth/email-already-in-use':
        return 'El usuario ya existe'

      //correo invalido
      case 'auth/invalid-email':
        return 'Correo Invalido'

      //contrasenia debil
      case 'auth/weak-password':
        return 'Contraseña Débil'
      
      case 'auth/missing-password':
        return 'Campo vacio'  

      //contrasenia incorrecta
      case 'auth/invalid-credential':
        return 'Correo o Contraseña incorrecta'
      
        default:
        return 'Error desconocido'
    }
  }
}
