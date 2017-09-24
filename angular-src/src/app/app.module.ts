import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

// Main Components
import { AppComponent } from './app.component';

// Navbar Component
import { NavbarComponent } from './components/navbar/navbar.component';

// Authentication Components
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

// Main page components
import { HomeComponent } from './components/home/home.component';
import { MembersComponent } from './components/members/members.component';
import { ProfileComponent } from './components/profile/profile.component';

// Fallback page components
import { NotfoundComponent } from './components/notfound/notfound.component';

// Services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

// Guards
import { ProtectedGuard } from './guards/protected.guard';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [ProtectedGuard] },
  { path: 'dashboard', redirectTo: '/' },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'navbar', component: NavbarComponent },
  { path: 'members', component: MembersComponent, canActivate: [ProtectedGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [ProtectedGuard] },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    MembersComponent,
    ProfileComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, ProtectedGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
