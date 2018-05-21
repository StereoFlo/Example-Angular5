import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PageComponent} from './page/page.component';
import {ErrorComponent} from './error/error.component';
import {LogoutComponent} from './logout/logout.component';

const routes: Routes = [
    {path: '', component: PageComponent},
    {path: 'auth/login', component: LoginComponent},
    {path: 'auth/logout', component: LogoutComponent},
    {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
    {path: ':slug', component: PageComponent},
    {path: '**', component: ErrorComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
