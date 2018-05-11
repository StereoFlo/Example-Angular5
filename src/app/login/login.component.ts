import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        if (this.authService.isAuth) {
            this.router.navigate(['']);
        }
    }

    onSubmit(myForm: NgForm) {
        if (myForm.value.email && myForm.value.password) {
            this.authService.login(myForm.value.email, myForm.value.password).then(data => {
                console.log(data);
            });
        }

    }

}
