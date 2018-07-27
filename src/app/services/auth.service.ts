import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserInterface} from '../interfeces/user-interface';
import {environment} from '../../environments/environment';
import {ResponseInterface} from '../interfeces/response-interface';
import {User} from '../classes/user';
import {Storage} from '../classes/helpers/storage';

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
     * @type {Storage}
     */
    private storage;

    /**
     * @param {HttpClient} httpClient
     */
    constructor(private httpClient: HttpClient) {
        this.storage = new Storage(Storage.sessionStorage, this.tokenName, 300);
        this.environment = environment;
        this._isAuth = !!this.storage.getFromStorage();
        if (this._isAuth) {
            this._token = this.storage.getFromStorage();
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
     * @param {string} email
     * @param {string} password
     * @returns {Promise}
     */
    login(email: string, password: string): Promise<AuthService> {
        if (this.storage.getFromStorage()) {
            this._isAuth = true;
            this._token = this.storage.getFromStorage();
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
                this.storage.data = this._token;
                this.storage.store();
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
        const hasToken = this.storage.getFromLocalStorage();
        if (hasToken) {
            this.httpClient.post(
                this.environment.apiSchema + this.environment.apiHost + '/auth/logout', {token: this.storage.getFromLocalStorage()}
            ).toPromise().then(data => {
                console.log(data);
            });
            this.storage.removeFromStorage();
        }
    }

    register(form) {
      return this.httpClient.post(this.environment.apiSchema + this.environment.apiHost + '/auth/register', form).toPromise();
    }
}
