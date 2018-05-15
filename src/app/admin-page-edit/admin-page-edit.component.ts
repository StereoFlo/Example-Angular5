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

    protected page: PageInterface = new Page();
    protected response: ResponseInterface = new Response();

    constructor(private adminService: AdminService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        if (this.route.snapshot.params['pageId']) {
            this.adminService.getPage(this.route.snapshot.params['pageId']).then(page => {
                console.log(page);
                this.page = page;
            }, error => {
                console.log(error);
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
                console.log(error);
            })
    }
}
