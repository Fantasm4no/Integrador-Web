import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ErrorFirebaseService } from '../../services/error-firebase.service';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginUsuario: FormGroup;
  users: any
  verificar :any

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private errorFirebase: ErrorFirebaseService,
    private usersService : UsersService) {
      this.loginUsuario=this.fb.group({
        email: ['', Validators.required],
        password: ['',Validators.required],
      })
    }

  ngOnInit(){
    this.usersService.getUserss().then(data => {
    this.users = data.docs.map((doc: any) => {
      return {
        id: doc.id,
        ...doc.data()
        }
      })

      this.users.forEach((user: any) => {
        this.verificar = user.password
      });

    })
  }

  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
    this.afAuth.signInWithEmailAndPassword(email,password).then((user)=> {
      console.log(user);
      if(user.user?.emailVerified){
        this.usersService.email = email
        this.usersService.pswd = password
        this.router.navigate(['dashboard'])
      }else{
        this.router.navigate(['/verificar'])
      };
    }).catch((error) => {
      console.log(error)
    }) 
  }

  withGoogle(){
    this.usersService.registrarConGoogle();
  }

}
