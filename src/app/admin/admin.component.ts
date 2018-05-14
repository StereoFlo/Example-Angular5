import {Component, OnInit} from '@angular/core';
import {AdminService} from '../services/admin.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    constructor(private adminService: AdminService) {
    }

    ngOnInit() {
        try {
            this.adminService.getPage().then(response => {
                console.log(response);
            });
        } catch (e) {
            console.log(e);
        }

    }

}
