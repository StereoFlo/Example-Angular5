import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminPageListComponent} from './admin-page-list/admin-page-list.component';
import {AdminPageEditComponent} from './admin-page-edit/admin-page-edit.component';

const routes: Routes = [
    { path: 'admin', component: AdminPageListComponent },
    { path: 'admin/page/:pageId', component: AdminPageEditComponent },
    { path: 'admin/page', component: AdminPageEditComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
