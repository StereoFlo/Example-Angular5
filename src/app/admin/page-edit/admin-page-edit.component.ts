import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ResponseInterface} from '../../interfeces/response-interface';
import {AdminService} from '../../services/admin.service';
import {Response} from '../../classes/response';
import {PageInterface} from '../../interfeces/page-interface';
import {Page} from '../../classes/page';

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
        if (this.route.snapshot.params['pageId']) {
            this.adminService.getPage(this.route.snapshot.params['pageId']).subscribe(response => {
                this.page  = new Page(response.data);
            }, error => {
                this.response.success = error.success;
                this.response.message = error.message;
            });
        }
        this.adminService.getList().subscribe(list => {
            this.pageList = list.data;
        });
    }

    onSubmit(pageForm: NgForm) {
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
}
