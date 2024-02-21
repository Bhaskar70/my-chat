import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';

const routes: Routes = [
  {path : '' , component:LandingPageComponent},
  {path : 'login' , component:LoginComponent},
  {path : 'register' , component:RegisterComponent},
  {path:'chat-page' , component : ChatPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
