import {Component, OnInit} from '@angular/core';
import {AdminService} from '../services/admin.service';
import {PageInterface} from '../interfeces/page-interface';
import {Page} from '../classes/page';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ResponseInterface} from '../interfeces/response-interface';
import {Response} from '../classes/response';

@Component({
    selector: 'app-admin-page-edit',
    templateUrl: './admin-page-edit.component.html',
    styleUrls: ['./admin-page-edit.component.css']
})
export class AdminPageEditComponent implements OnInit {

    page: PageInterface = new Page();
    response: ResponseInterface = new Response();
    // pageList = [];

    constructor(private adminService: AdminService, private route: ActivatedRoute) {
        this.adminService.checkAuth();
    }

    ngOnInit() {
        // this.adminService.getList().then(list => {
        //     this.pageList = list.data;
        // });
        if (this.route.snapshot.params['pageId']) {
            this.adminService.getPage(this.route.snapshot.params['pageId']).then(page => {
                this.page = page;
            }, error => {
                this.response.success = error.success;
                this.response.message = error.message;
            });
        }
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
