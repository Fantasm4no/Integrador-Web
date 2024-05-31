import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecuperarPswdComponent } from './components/recuperar-pswd/recuperar-pswd.component';
import { AnadirLibroComponent } from './components/anadir-libro/anadir-libro.component';
import { ActualizarLibroComponent } from './components/actualizar-libro/actualizar-libro.component';
import { EliminarLibroComponent } from './components/eliminar-libro/eliminar-libro.component';
import { VerificarComponent } from './components/verificar/verificar.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'recuperar-pswrd', component: RecuperarPswdComponent },
    { path: 'anadir', component: AnadirLibroComponent},
    { path: 'actualizar', component: ActualizarLibroComponent}, 
    { path: 'eliminar', component: EliminarLibroComponent}, 
    { path: 'verificar', component: VerificarComponent },
    { path: 'mi-perfil', component: MiPerfilComponent},
    { path: 'usuarios',component:AdminUsersComponent}
];
