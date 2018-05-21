import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminPageListComponent} from './admin-page-list/admin-page-list.component';
import {AdminPageEditComponent} from './admin-page-edit/admin-page-edit.component';

const routes: Routes = [
    {path: '', component: AdminPageListComponent},
    {path: 'page/:pageId', component: AdminPageEditComponent},
    {path: 'page', component: AdminPageEditComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
