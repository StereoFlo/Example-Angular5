import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserInterface} from '../interfeces/user-interface';
import {environment} from '../../environments/environment';
import {ResponseInterface} from '../interfeces/response-interface';
import {User} from '../classes/user';

@Injectable()
export class AuthService {

    /**
     * @type {string}
     */
    tokenName: string = '_token';

    /**
     * @type {boolean}
     */
    private _isAuth = false;

    /**
     * @type {string}
     */
    private _token: string = '';

    /**
     * message when error
     * @type {string}
     */
    errorMessage: string = '';

    /**
     * current user
     */
    private _user: UserInterface;

    /**
     * environment
     */
    private environment;

    /**
     * @param {HttpClient} httpClient
     */
    constructor(private httpClient: HttpClient) {
        this.environment = environment;
        this._isAuth = !!this.getFromLocalStorage();
        if (this._isAuth) {
            this._token = this.getFromLocalStorage();
            this.tokenCheck();
        }
    }

    /**
     * @returns {boolean}
     */
    get isAuth(): boolean {
        return this._isAuth;
    }

    /**
     * current token
     * @returns {string}
     */
    get token(): string {
        return this._token;
    }

    /**
     * current user
     * @returns {UserInterface}
     */
    get user(): UserInterface {
        return this._user;
    }

    /**
     * @param {string} email
     * @param {string} password
     * @returns {Promise}
     */
    login(email: string, password: string): Promise<AuthService> {
        if (this.getFromLocalStorage()) {
            this._isAuth = true;
            this._token = this.getFromLocalStorage();
            return;
        }
        return this.httpClient
            .post<ResponseInterface>(this.environment.apiSchema + this.environment.apiHost + '/auth/login', {
                email: email,
                password: password
            })
            .toPromise().then(response => {
                this._isAuth = true;
                this._user = new User(response.data);
                this._token = this._user.apiToken.key;
                this.setToLocalSorage(this._token);
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
            .get(this.environment.apiSchema + this.environment.apiHost + '/user', {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-TOKEN': this._token
                }
            })
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
        this._token = '';
        return true;
    }
}
