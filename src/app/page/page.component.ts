import {Component, OnInit} from '@angular/core';
import {MainService} from '../services/main.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

    title: string;
    content: string;
    isError = false;
    errorMessage = 'Произошла ошибка';

    constructor(private mainService: MainService, private route: ActivatedRoute) {}

    ngOnInit() {
        console.log(this.route.snapshot.params['slug']);
        return this.mainService.getPage(this.route.snapshot.params['slug']).then(response => {
            if (!response.success) {
                this.isError = true;
                this.errorMessage = response.message;
                return this;
            }
            this.title = response.data.title;
            this.content = response.data.content;
        });

    }

}
