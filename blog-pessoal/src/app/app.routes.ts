import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { AuthGuard } from './guard/auth-guard.guard';

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
    }
];
