import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageComponent} from './page/page.component';
import {ErrorComponent} from './error/error.component';

const routes: Routes = [
    {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
    {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
    {path: '', component: PageComponent},
    {path: ':slug', component: PageComponent},
    {path: '**', component: ErrorComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
