import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ResponseInterface} from '../../interfeces/response-interface';
import {AdminService} from '../../services/admin.service';
import {Response} from '../../classes/response';
import {PageInterface} from '../../interfeces/page-interface';
import {Page} from '../../classes/page';
import {Storage} from '../../classes/helpers/storage';

@Component({
    selector: 'app-admin-page-edit',
    templateUrl: './admin-page-edit.component.html',
    styleUrls: ['./admin-page-edit.component.css']
})
export class PageEditComponent implements OnInit {

    response: ResponseInterface = new Response();
    page: PageInterface = new Page();
    pageList = [];

    constructor(private adminService: AdminService, private route: ActivatedRoute) {
        this.adminService.checkAuth();
    }

    ngOnInit() {
        this.getList();
        this.getPage();
    }

    /**
     * @param {NgForm} pageForm
     */
    onSubmit(pageForm: NgForm): void {
        if (pageForm.value.pageId) {
            const storage = new Storage();
            storage.dataKey = 'page' + pageForm.value.pageId;
            storage.currentStorage = Storage.sessionStorage;
            storage.removeFromStorage();
        }
        this
            .adminService
            .savePage(
                pageForm.value.pageId,
                pageForm.value.title,
                pageForm.value.content,
                pageForm.value.slug,
                pageForm.value.isDefault
            )
            .then(response => {
                    this.response.message = response.message;
                    this.response.success = response.success;
                }, error => {
                    this.response.success = error.success;
                    this.response.message = error.message;
            });
    }

    /**
     * get page list
     */
    private getList(): void {
        const storage = new Storage();
        storage.dataKey = 'pageList';
        storage.ttl = 300;
        storage.currentStorage = Storage.sessionStorage;
        const pageList = storage.getFromStorage();
        if (pageList) {
            this.pageList = pageList;
            return;
        }
        this.adminService.getList().subscribe(list => {
            storage.data = list.data;
            storage.store();
            this.pageList = list.data;
        });
    }

    /**
     * get page
     */
    private getPage(): void {
        if (this.route.snapshot.params['pageId']) {
            const storage = new Storage();
            storage.dataKey = 'page' + this.route.snapshot.params['pageId'];
            storage.ttl = 300;
            storage.currentStorage = Storage.sessionStorage;
            const page = storage.getFromStorage();
            if (page) {
                this.pageList = page;
                return;
            }
            this.adminService.getPage(this.route.snapshot.params['pageId']).subscribe(response => {
                this.page  = new Page(response.data);
                storage.data = this.page;
                storage.store();
            }, error => {
                this.response.success = error.success;
                this.response.message = error.message;
            });
        }
    }
}
