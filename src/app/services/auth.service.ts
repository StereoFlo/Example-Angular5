import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginInterface} from '../interfeces/login-interface';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

    /**
     * @type {string}
     */
    tokenName: string = 'token';

    /**
     * @type {boolean}
     */
    isAuth = false;

    /**
     * @type {string}
     */
    token: string = '';

    /**
     * message when error
     * @type {string}
     */
    errorMessage: string = '';

    /**
     * environment
     */
    private environment;

    /**
     * @param {HttpClient} httpClient
     */
    constructor(private httpClient: HttpClient) {
        this.environment = environment;
        this.isAuth = !!this.getFromLocalStorage();
        if (this.isAuth) {
            this.token = this.getFromLocalStorage();
            this.tokenCheck();
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
            return;
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
        const hasToken = this.getFromLocalStorage();
        if (hasToken) {
            this.httpClient.post(
                this.environment.apiSchema + this.environment.apiHost + '/auth/logout', {token: this.getFromLocalStorage()}
                ).toPromise().then(data => {
                    console.log(data);
            });
            this.removeToken();
        }
    }

    /**
     * checks for token
     */
    tokenCheck(): void {
        this.httpClient
            .get(this.environment.apiSchema + this.environment.apiHost + '/user', {headers: {
                    'Content-Type': 'application/json',
                    'X-API-TOKEN': this.token
                }})
            .toPromise()
            .catch(() => {
                this.removeToken();
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

    /**
     * @return {boolean}
     */
    private removeToken(): boolean {
        localStorage.removeItem(this.tokenName);
        this.token = '';
        return true;
    }
}
