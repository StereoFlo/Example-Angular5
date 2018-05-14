import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {AdminPageList} from '../interfeces/admin-page-list';

@Injectable()
export class AdminService {

    constructor(private httpClient: HttpClient, private authService: AuthService) {
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
            .get<AdminPageList>('http://api.bronnikov.lan/admin/page/list', {headers: this.getHeaders()})
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
