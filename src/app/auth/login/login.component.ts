import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    /**
     * error message, if exists
     * @type {string}
     */
    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) {}

    /**
     * init
     */
    ngOnInit() {
        if (this.authService.isAuth) {
            this.router.navigate(['']);
        }
    }

    /**
     * handle form
     * @param {NgForm} loginForm
     */
    onSubmit(loginForm: NgForm): void {
        if (loginForm.value.email && loginForm.value.password) {
            this.authService.login(loginForm.value.email, loginForm.value.password).subscribe(data => {
                if (data.isAuth && data.token) {
                    this.router.navigate(['']);
                    return;
                }
                if (!data.isAuth && data.errorMessage) {
                    this.errorMessage = data.errorMessage;
                    return;
                }
            });
        }

    }

}
