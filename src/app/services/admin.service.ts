import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {AdminPageList} from '../interfeces/admin-page-list';
import {environment} from '../../environments/environment';
import {PageInterface} from '../interfeces/page-interface';

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
    getList(): Promise<AdminPageList> {
        this.checkAuth();
        return this
            .httpClient
            .get<AdminPageList>(this.environment.apiSchema + this.environment.apiHost + '/admin/page/list', {headers: this.getHeaders()})
            .toPromise();
    }

    /**
     * @param {string} pageId
     * @returns {Promise<PageInterface>}
     */
    getPage(pageId: string = null): Promise<PageInterface> {
        this.checkAuth();
        if (!pageId) {
            throw new Error('pageId is required parameter');
        }
        return this
            .httpClient
            .get<PageInterface>(this.environment.apiSchema + this.environment.apiHost + '/admin/page/' + pageId, {headers: this.getHeaders()})
            .toPromise();
    }

    /**
     * builds a header
     * @returns {Object}
     */
    private getHeaders() {
        return {
            'Content-Type': 'application/json',
            'X-API-TOKEN': this.authService.token
        };
    }

    private checkAuth(): boolean {
        if (!this.authService.isAuth) {
            throw new Error('you are not an admin');
        }
        return true;
    }

}
