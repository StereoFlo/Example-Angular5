import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PageInterface} from '../interfeces/page-interface';
import {AuthService} from './auth.service';

@Injectable()
export class MainService {

    constructor(private httpClient: HttpClient, private authService: AuthService) {}

    /**
     * @param {string} pageName
     * @returns {Promise<PageInterface>}
     */
    getPage(pageName: string = null): Promise<PageInterface> {
        if (pageName) {
            return this
                .httpClient
                .get<PageInterface>('http://api.bronnikov.lan/page/' + pageName, {headers: this.getHeaders()})
                .toPromise();
        }
        return this
            .httpClient
            .get<PageInterface>('http://api.bronnikov.lan/page/default', {headers: this.getHeaders()})
            .toPromise();
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
