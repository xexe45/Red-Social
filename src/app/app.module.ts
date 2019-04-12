import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { APP_ROUTES } from './app.route';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PagesModule } from './pages/pages.module';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    ReactiveFormsModule,
    FormsModule,
    PagesModule,
    ServicesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
