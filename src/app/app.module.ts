import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { chatReducer } from './store/reducer';
import { ChatEffects } from './store/effects';
import { MinLengthDirective } from './directives/username.directive';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    ChatPageComponent,
    MinLengthDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    StoreModule.forRoot({data : chatReducer}),
    EffectsModule.forRoot([ChatEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
