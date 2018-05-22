import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PageInterface} from '../interfeces/page-interface';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MainService {

    /**
     * env vars
     */
    private environment;

    constructor(private httpClient: HttpClient, private authService: AuthService) {
        this.environment = environment;
    }

    /**
     * @param {string} pageName
     * @returns {Observable<PageInterface>}
     */
    getPage(pageName: string = null): Observable<PageInterface> {
        if (pageName) {
            return this
                .httpClient
                .get<PageInterface>(
                    this.environment.apiSchema + this.environment.apiHost + '/page/' + pageName,
                    {headers: this.getHeaders()}
                    );
        }
        return this
            .httpClient
            .get<PageInterface>(this.environment.apiSchema + this.environment.apiHost + '/page/default', {headers: this.getHeaders()});
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
