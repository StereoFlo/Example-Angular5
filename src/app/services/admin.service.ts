import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {AdminPageList} from '../interfeces/admin-page-list';
import {environment} from '../../environments/environment';
import {PageInterface} from '../interfeces/page-interface';
import {ResponseInterface} from '../interfeces/response-interface';

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
     *
     * @param {string} pageId
     * @param {string} title
     * @param {string} content
     * @param {string} slug
     * @param {boolean} isDefault
     * @returns {Promise<ResponseInterface>}
     */
    savePage(pageId: string = null, title: string, content: string, slug: string, isDefault: boolean): Promise<ResponseInterface> {
        return this
            .httpClient
            .post<ResponseInterface>(this.environment.apiSchema + this.environment.apiHost + '/admin/page/save', {
                pageId: pageId,
                title: title,
                content: content,
                slug: slug,
                isDefault: isDefault
            }, {headers: this.getHeaders()})
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
