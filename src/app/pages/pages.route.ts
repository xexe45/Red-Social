import { OtherComponent } from './other/other.component';
import { UserComponent } from './user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginGuard } from '../services/guards/login.guard';
import { MeComponent } from './me/me.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'home', component: ProfileComponent },
            { path: 'perfil', component: MeComponent },
            { path: 'people/:slug', component: OtherComponent },
            { path: '', redirectTo: '/home', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
