import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {PageComponent} from './page/page.component';
import {LoginComponent} from './login/login.component';

import {FormsModule} from '@angular/forms';
import {MainService} from './services/main.service';
import {ErrorComponent} from './error/error.component';
import {AdminService} from './services/admin.service';
import { AdminPageListComponent } from './admin-page-list/admin-page-list.component';
import { AdminCreatePageComponent } from './admin-create-page/admin-create-page.component';

@NgModule({
    declarations: [
        AppComponent,
        PageComponent,
        LoginComponent,
        ErrorComponent,
        AdminPageListComponent,
        AdminCreatePageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [AuthService, MainService, AdminService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
