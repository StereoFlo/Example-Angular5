import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PageComponent} from './page/page.component';
import {ErrorComponent} from './error/error.component';
import {AdminPageListComponent} from './admin-page-list/admin-page-list.component';
import {AdminPageEditComponent} from './admin-page-edit/admin-page-edit.component';

const routes: Routes = [
    { path: '', component: PageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminPageListComponent },
    { path: 'admin/page/:pageId', component: AdminPageEditComponent },
    { path: ':slug', component: PageComponent },
    { path: '**', component: ErrorComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
