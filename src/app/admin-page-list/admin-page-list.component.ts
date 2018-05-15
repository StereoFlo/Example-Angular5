import {Component, OnInit} from '@angular/core';
import {AdminService} from '../services/admin.service';

@Component({
    selector: 'app-admin-page-list',
    templateUrl: './admin-page-list.component.html',
    styleUrls: ['./admin-page-list.component.css']
})
export class AdminPageListComponent implements OnInit {

    pageList = [];

    constructor(private adminService: AdminService) {
    }

    ngOnInit() {
        this.adminService.getList().then(list => {
            this.pageList = list.data;
        });
    }

}
