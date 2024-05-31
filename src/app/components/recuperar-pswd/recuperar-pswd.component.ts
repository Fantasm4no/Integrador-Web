import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ErrorFirebaseService } from '../../services/error-firebase.service';

@Component({
  selector: 'app-recuperar-pswd',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './recuperar-pswd.component.html',
  styleUrl: './recuperar-pswd.component.scss'
})
export class RecuperarPswdComponent {

  recuperarUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private errorFirebase: ErrorFirebaseService
  ) {
    this.recuperarUsuario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  recuperar(): void {
    const email = this.recuperarUsuario.value.correo;

    this.afAuth.sendPasswordResetEmail(email).then(() => {
      /*this.toastr.info('Se le acaba de enviar un correo para restablecer su contraseña', 'Recuperar password');*/
      this.router.navigate(['/login']);
      return;
    }).catch((error) => {
        /*this.toastr.error(this.errorFirebase.codeError(error.code),'Error')*/
    });
  }
}
