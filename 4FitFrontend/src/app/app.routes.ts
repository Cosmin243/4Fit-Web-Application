import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TarifeComponent } from './pages/tarife/tarife.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServicePageComponent } from './pages/service-page/service-page.component';
import { ClassPageComponent } from './pages/class-page/class-page.component';
import { OrarClaseComponent } from './pages/orar-clase/orar-clase.component';
import { EchipaNoastraComponent } from './pages/echipa-noastra/echipa-noastra.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdministrareComponent } from './pages/administrare/administrare.component';
import {authGuard} from './guards/auth.guard';
import {loginGuard} from './guards/login.guard';
import {adminGuard} from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'profil', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'administrare', component: AdministrareComponent, canActivate: [adminGuard] },
  { path: 'profile', redirectTo: 'profil', pathMatch: 'full' },
  { path: 'tarife', component: TarifeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'echipa', component: EchipaNoastraComponent },
  { path: 'echipa-noastra', redirectTo: 'echipa', pathMatch: 'full' },
  { path: 'orar-clase', component: OrarClaseComponent, canActivate: [authGuard] },
  { path: 'sala-fitness', component: ServicePageComponent },
  { path: 'bazin-inot', component: ServicePageComponent },
  { path: 'antrenor-personal', component: ServicePageComponent },
  { path: 'aerobic', component: ClassPageComponent },
  { path: 'karate', component: ClassPageComponent },
  { path: 'yoga', component: ClassPageComponent },
  { path: 'pilates', component: ClassPageComponent },
  { path: 'zumba', component: ClassPageComponent },
  { path: 'dashboard', redirectTo: 'profil', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
