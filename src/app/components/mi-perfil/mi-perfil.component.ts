import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Users } from '../../domain/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.scss'
})
export class MiPerfilComponent {

  users: any
  emailtoken : any
  pswdToken: any

  constructor(private userService: UsersService, private router: Router){
    this.emailtoken = this.userService.email
    this.pswdToken = this.userService.pswd
  }

  ngOnInit(){
    this.userService.getUserss().then(data => {
      this.users = data.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
    })
  }

  update(user: Users) {
    this.userService.updateUsers(user.id, {
      nombre: user.nombre,
      apellido: user.apellido,
      email: this.emailtoken,
      password: this.pswdToken,
      phone: user.phone,
      biography: user.biography
    }).then(() => {
      console.log('Usuario actualizado');
      this.router.navigate(['/dashboard'])
    }).catch(error => {
      console.error('Error actualizando Usuario: ', error);
    });
  }

}
