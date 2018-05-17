import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginInterface} from '../interfeces/login-interface';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

    tokenName = 'token';
    isAuth = false;
    token = '';
    errorMessage = '';
    private environment;

    constructor(private httpClient: HttpClient) {
        this.environment = environment;
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
            .post<LoginInterface>(this.environment.apiSchema + this.environment.apiHost + '/auth/login', {email: email, password: password})
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
     * logout
     */
    logout(): void {
        if (this.getFromLocalStorage()) {
            this.httpClient.post(this.environment.apiSchema + this.environment.apiHost + '/auth/logout', {token: this.getFromLocalStorage()});
            this.setToLocalSorage('');
        }
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
