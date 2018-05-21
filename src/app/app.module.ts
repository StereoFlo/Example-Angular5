import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {PageComponent} from './page/page.component';
import {FormsModule} from '@angular/forms';
import {MainService} from './services/main.service';
import {ErrorComponent} from './error/error.component';
import {AdminService} from './services/admin.service';

@NgModule({
    declarations: [
        AppComponent,
        PageComponent,
        ErrorComponent,
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
