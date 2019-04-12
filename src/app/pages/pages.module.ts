import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { PAGES_ROUTES } from './pages.route';
import { PipesModule } from '../pipes/pipes.module';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MeComponent } from './me/me.component';
import { OtherComponent } from './other/other.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MomentModule } from 'angular2-moment';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PAGES_ROUTES,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    MomentModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [PagesComponent, ProfileComponent, UserComponent, MeComponent, OtherComponent]
})
export class PagesModule { }
