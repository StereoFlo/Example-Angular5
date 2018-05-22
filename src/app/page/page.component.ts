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
        return this.mainService.getPage(this.route.snapshot.params['slug']).subscribe(response => {
            this.title = response.data.title;
            this.content = response.data.content;
        }, error => {
                this.isError = true;
                this.errorMessage = error.error.message;
        });

    }

}
