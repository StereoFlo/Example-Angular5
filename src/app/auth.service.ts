import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

    tokenName = 'token';
    isAuth = false;
    token = '';

    constructor(private httpClient: HttpClient) {
        this.isAuth = !!this.getFromLocalStorage();
    }

    /**
     * @param {string} email
     * @param {string} password
     * @returns {void}
     */
    login(email: string, password: string) {
        if (this.getFromLocalStorage()) {
            this.isAuth = true;
            this.token = this.getFromLocalStorage();
        }
        this.httpClient
            .post('http://api.bronnikov.lan/auth/login', {email: email, password: password})
            .toPromise().then(response => {
            if (response.success === true) {
                if (response.data.token) {
                    this.setToLocalSorage(response.data.token);
                    this.isAuth = true;
                    this.token = response.data.token;
                }
            }
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
