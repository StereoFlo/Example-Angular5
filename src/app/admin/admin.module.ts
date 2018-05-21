import {NgModule} from '@angular/core';
import {AdminRoutingModule} from './admin-routing.module';
import {AuthService} from '../services/auth.service';
import {AdminService} from '../services/admin.service';
import {AdminPageEditComponent} from './admin-page-edit/admin-page-edit.component';

@NgModule({
    declarations: [
        AdminPageEditComponent,
        AdminPageEditComponent
    ],
    imports: [
        AdminRoutingModule
    ],
    providers: [
        AuthService,
        AdminService
    ],
})
export class AdminModule {
}
