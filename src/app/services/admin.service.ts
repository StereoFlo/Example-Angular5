import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class AdminService {

    constructor(private httpClient: HttpClient, private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    }

    /**
     * @returns {any}
     */
    getPage() {
        if (!this.authService.isAuth) {
            this.router.navigate(['']);
            throw new Error('you are not an admin');
        }
        return this
            .httpClient
            .get('http://api.bronnikov.lan/admin/', {headers: this.getHeaders()})
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
