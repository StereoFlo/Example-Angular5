import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import { PageComponent } from './page/page.component';


@NgModule({
    declarations: [
        AppComponent,
        PageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
