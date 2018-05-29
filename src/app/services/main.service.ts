import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PageInterface} from '../interfeces/page-interface';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {ResponseInterface} from '../interfeces/response-interface';

@Injectable()
export class MainService {

    /**
     * env vars
     */
    private environment;

    /**
     * @param {HttpClient} httpClient
     * @param {AuthService} authService
     */
    constructor(private httpClient: HttpClient, private authService: AuthService) {
        this.environment = environment;
    }

    /**
     * @param {string} pageName
     * @returns {Observable<PageInterface>}
     */
    getPage(pageName: string = null): Observable<ResponseInterface> {
        return this
            .httpClient
            .get<ResponseInterface>(this.getUrl(pageName), {headers: this.getHeaders()});
    }

    /**
     * @param {string} pageName
     * @returns {string}
     */
    private getUrl(pageName: string = null): string {
        if (pageName) {
            return this.environment.apiSchema + this.environment.apiHost + '/page/' + pageName;
        }
        return this.environment.apiSchema + this.environment.apiHost + '/page/default';
    }

    /**
     * builds a header
     * @returns {HttpHeaders}
     */
    private getHeaders() {
        const headers = {'Content-Type': 'application/json'};
        if (this.authService.isAuth) {
            headers['X-API-TOKEN'] = this.authService.token;
        }
        return headers;
    }
}
