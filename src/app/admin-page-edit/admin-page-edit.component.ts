import {Component, OnInit} from '@angular/core';
import {AdminService} from '../services/admin.service';
import {PageInterface} from '../interfeces/page-interface';
import {Page} from '../classes/page';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-admin-page-edit',
    templateUrl: './admin-page-edit.component.html',
    styleUrls: ['./admin-page-edit.component.css']
})
export class AdminPageEditComponent implements OnInit {

    protected page: PageInterface = new Page();

    constructor(private adminService: AdminService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.adminService.getPage(this.route.snapshot.params['pageId']).then(page => {
            console.log(page);
            this.page = page;
        });
    }

    onSubmit(pageForm: NgForm) {
        console.log(pageForm);
    }
}
