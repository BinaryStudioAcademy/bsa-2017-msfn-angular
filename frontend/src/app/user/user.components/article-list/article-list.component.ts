import {Component, OnInit} from '@angular/core';
import {MarkdownService} from '../../../services/markdown.service';
import {HttpService} from '../../../services/http.service';
import {IHttpReq} from '../../../models/http-req';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

    articles: any[];
    displayArticles: any[];

    constructor(private httpHandler: HttpService,
                private markdownService: MarkdownService) {
    }

    ngOnInit() {
        const sendData: IHttpReq = {
            url: `/api/articles/`,
            method: 'GET',
            body: '',
        };

        this.httpHandler.sendRequest(sendData)
            .then((res) => {
                res = res.map((item, i) => {
                    // if (!item.image) {
                    //     item.image = '';
                    // }

                    item.previewHTML = this.markdownService.convert(item.preview);

                    return item;
                });

                if (res) {
                    this.articles = res;
                }

                console.log(this.articles);
                this.displayArticles = this.articles;
            });
    }

}
