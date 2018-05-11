import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PageComponent} from './page/page.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'page', component: PageComponent },
    { path: 'page/:slug', component: PageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
