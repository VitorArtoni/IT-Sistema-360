/**
 * Angular Objects
 */
import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

/**
 * Custom Components
 */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CadastroComponent } from './components/cadastro/containers/cadastro.component';
import { HomeComponent } from './components/home/containers/home/home.component';
import { CustomContent } from './components/content/content.component';

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
    HomeComponent,
    CustomContent
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
  entryComponents: [
    CustomContent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private injector: Injector) { 
    const customContent = createCustomElement(CustomContent, {injector: this.injector});
    customElements.define('custom-content',customContent);
  }
}
