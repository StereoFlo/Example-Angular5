import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {AdminPageList} from '../interfeces/admin-page-list';
import {environment} from '../../environments/environment';

@Injectable()
export class AdminService {

    /**
     * env vars
     */
    private environment;

    constructor(private httpClient: HttpClient, private authService: AuthService) {
        this.environment = environment;
    }

    /**
     * @returns {Promise<AdminPageList>}
     */
    getPage(): Promise<AdminPageList> {
        if (!this.authService.isAuth) {
            throw new Error('you are not an admin');
        }
        return this
            .httpClient
            .get<AdminPageList>(this.environment.apiSchema + this.environment.apiHost + '/admin/page/list', {headers: this.getHeaders()})
            .toPromise();
    }

    /**
     * builds a header
     * @returns {HttpHeaders}
     */
    private getHeaders() {
        const headers = {'Content-Type': 'application/json'};
        headers['X-API-TOKEN'] = this.authService.token;
        return headers;
    }

}
