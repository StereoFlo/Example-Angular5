import {Component, OnInit} from '@angular/core';
import {MainService} from '../services/main.service';
import {ActivatedRoute} from '@angular/router';
import {PageInterface} from '../interfeces/page-interface';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

    title: string;
    content: string;

    constructor(private mainService: MainService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        if (this.route.snapshot.params['slug']) {
            return this.getPageBySlug(this.route.snapshot.params['slug']).then(data => {
                this.title = data.title;
                this.content = data.content;
            });
        }
        return this.getDefaultPage().then(data => {
            this.title = data.title;
            this.content = data.content;
        });
    }

    /**
     * get default page
     * @returns {Promise<PageInterface>}
     */
    private getDefaultPage(): Promise<PageInterface> {
        return this.mainService.getPage();
    }

    /**
     * get by slug
     * @param {string} slug
     * @returns {Promise<PageInterface>}
     */
    private getPageBySlug(slug: string): Promise<PageInterface> {
        return this.mainService.getPage(slug);
    }

}
