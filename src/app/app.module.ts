/**
 * Angular Objects
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

/**
 * Custom Components
 */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CadastroComponent } from './components/cadastro/containers/cadastro.component';
import { HomeComponent } from './components/home/containers/home/home.component';

/**
 * Custom Services
 */
import { CadastroService } from './services/cadastro.service';
import { TurmasService } from './services/turmas.service';
import { AuthService } from './services/auth.service';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';

import { Globals } from './app.globals';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ 
    CadastroService,
    TurmasService,
    AuthService,
    HttpErrorHandler,
    MessageService,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
