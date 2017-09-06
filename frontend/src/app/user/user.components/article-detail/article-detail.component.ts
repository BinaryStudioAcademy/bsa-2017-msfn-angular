import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IHttpReq} from './../../../models/http-req';
import {HttpService} from '../../../services/http.service';
import IArticle = ArticleApi.IArticle;
import {MarkdownService} from '../../../services/markdown.service';


@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
    article: IArticle;
    converted: Object;

    constructor(public activatedRoute: ActivatedRoute,
                private httpHandler: HttpService,
                private markdownService: MarkdownService) {
    }

    ngOnInit() {
        if (this.activatedRoute.snapshot.params.id) {
            const articleID = this.activatedRoute.snapshot.params.id;
            const sendData: IHttpReq = {
                url: `/api/articles/` + articleID,
                method: 'GET',
                body: '',
            };

            this.httpHandler.sendRequest(sendData)
                .then((res) => {
                    if (res) {
                        this.article = res[0];
                        this.converted = {
                            detail: this.markdownService.convert(this.article.detail),
                            preview: this.markdownService.convert(this.article.preview),
                        };
                    }
                });
        }
    }

}
