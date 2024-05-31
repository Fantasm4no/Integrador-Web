import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User, UsersService } from '../../services/users.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent {

  users: User[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  editUser(user: User): void {
    user.editing = true;
  }

  saveUser(user: User): void {
    user.editing = false;
    this.usersService.updateUserDetails(user.id, user)
      .then(() => {
        console.log('Usuario actualizado:', user);
      })
      .catch(error => {
        console.error('Error al actualizar usuario:', error);
      });
  }
}
