import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginInterface} from '../interfeces/login-interface';

@Injectable()
export class AuthService {

    tokenName = 'token';
    isAuth = false;
    token = '';
    errorMessage = '';

    constructor(private httpClient: HttpClient) {
        this.isAuth = !!this.getFromLocalStorage();
        if (this.isAuth) {
            this.token = this.getFromLocalStorage();
        }
    }

    /**
     * @param {string} email
     * @param {string} password
     * @returns {Promise}
     */
    login(email: string, password: string): Promise<AuthService> {
        if (this.getFromLocalStorage()) {
            this.isAuth = true;
            this.token = this.getFromLocalStorage();
        }
        return this.httpClient
            .post<LoginInterface>('http://api.bronnikov.lan/auth/login', {email: email, password: password})
            .toPromise().then(response => {
                if (response.success === true) {
                    if (response.data.token) {
                        this.setToLocalSorage(response.data.token);
                        this.isAuth = true;
                        this.token = response.data.token;
                        return this;
                    }
                    return this;
                }
                return this;
            }).catch(error => {
                this.errorMessage = error.error.message;
                return this;
            });
    }

    /**
     * @returns {string}
     */
    private getFromLocalStorage(): string {
        return localStorage.getItem(this.tokenName);
    }

    /**
     * @param {string} tokenValue
     * @returns {boolean}
     */
    private setToLocalSorage(tokenValue: string): boolean {
        localStorage.setItem(this.tokenName, tokenValue);
        return true;
    }
}
