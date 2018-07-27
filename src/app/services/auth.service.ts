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
    tokenName = '_token';

    /**
     * message when error
     * @type {string}
     */
    errorMessage = '';

    /**
     * @type {boolean}
     */
    private _isAuth = false;

    /**
     * @type {string}
     */
    private _token = '';

    /**
     * current user
     */
    private _user: UserInterface;

    /**
     * @type {boolean}
     * @private
     */
    private _isAdmin = false;

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

    get isAdmin(): boolean {
        return this._isAdmin;
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
                this._isAdmin = this._user.roles === 'admin';
                this.setToLocalStorage(this._token);
                return this;
            }).catch(error => {
                if (error && error.error) {
                    this.errorMessage = error.error.message;
                } else {
                    this.errorMessage = 'Ошибка приложения';
                    console.log(error);
                }
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

    register(form) {
      return this.httpClient.post(this.environment.apiSchema + this.environment.apiHost + '/auth/register', form).toPromise();
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
    private setToLocalStorage(tokenValue: string): boolean {
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
