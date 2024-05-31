import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ErrorFirebaseService } from '../../services/error-firebase.service';
import { UsersService } from '../../services/users.service';
import { Users } from '../../domain/user';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  user: Users = new Users()
  registrarUsuario: FormGroup; 

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private errorfirebase: ErrorFirebaseService,
    private usersService: UsersService){
      this.registrarUsuario = this.fb.group({
        nombre: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repetirPassword: ['', Validators.required],
        role: [''] // Añade 'role' si es necesario
      });
    }

  ngOnInit(){}

  registrar() {
    const nombre = this.registrarUsuario.value.nombre;
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;
    const role = this.registrarUsuario.value.role;

    if (password !== repetirPassword) {
      alert('Contraseñas no coinciden')
      return;
    }

    this.afAuth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        user.updateProfile({
          displayName: nombre
        }).then(() => {
          // Guardar los datos del usuario en Firestore
          this.afs.collection('usuarios').doc(user.uid).set({
            uid: user.uid,
            nombre: nombre,
            email: email,
            role: role || 'admin' // Guarda el rol si está definido, de lo contrario, 'user'
          }).then(() => {
            this.anadir()
            this.verificarCorreo();
          }).catch((error) => {
            console.log(error);
          });
          console.log(userCredential.user?.displayName);
        }).catch((error) => {
          console.log(error);
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  withGoogle() {
    this.usersService.registrarConGoogle();
  }

  verificarCorreo() {
    this.afAuth.currentUser
      .then((user) => user?.sendEmailVerification())
      .then(() => {
        alert(
          'Le enviamos un correo electrónico para su verificación'
        );
      this.router.navigate(['/login']);
    });
  }

  anadir(){
    this.usersService.addUsers(this.user)
    console.log(this.user)
  }
}
