import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { AuthGuard } from './guard/auth-guard.guard';
import { MeuPerfilComponent } from './pages/dashboard/meu-perfil/meu-perfil.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    },
    {
        path: "auth/dashboard",
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "auth/dashboard/meuPerfil",
        component: MeuPerfilComponent,
        canActivate: [AuthGuard]
    }
];
