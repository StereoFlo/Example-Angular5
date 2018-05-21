import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AdminService} from '../services/admin.service';
import {AuthService} from '../services/auth.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
    ],
    declarations: [
        LoginComponent,
        LogoutComponent,
    ],
    providers: [
        AuthService,
        AdminService
    ],
})
export class AuthModule {
}
