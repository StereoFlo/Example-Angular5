import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PageInterface} from '../interfeces/page-interface';

@Injectable()
export class MainService {

    constructor(private httpClient: HttpClient) {
    }

    /**
     * @param {string} pageName
     * @returns {Promise<PageInterface>}
     */
    getPage(pageName: string): Promise<PageInterface> {
        return this.httpClient.get<PageInterface>('http://api.bronnikov.lan/page/' + pageName).toPromise();
    }
}
