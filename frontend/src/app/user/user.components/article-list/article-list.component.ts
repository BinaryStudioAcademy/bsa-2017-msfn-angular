import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MarkdownService} from '../../../services/markdown.service';
import {HttpService} from '../../../services/http.service';
import {IHttpReq} from '../../../models/http-req';
import {EncryptService} from '../../../services/encrypt.service';
import {WindowObj} from '../../../services/window.service';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ArticleListComponent implements OnInit {

    public userId = (this.window.data._injectedData as any).userId;
    public articles: any[] = [];
    public selectedTab = 0;
    private lastSearch = '';
    private searchTimeout: any = null;
    public loading = false;
    private filter = {
        userId: this.userId
    };
    private tabs = {
        0: 'my',
        1: 'follow',
        2: 'all'
    };
    public linksToEdit = true;

    constructor(private httpHandler: HttpService,
                private markdownService: MarkdownService,
                private encryptService: EncryptService,
                private window: WindowObj) {
    }

    ngOnInit() {
        this.loadArticles();
    }

    changeSort(e) {
        const tab = this.tabs[this.selectedTab];

        this.articles = [];

        this.linksToEdit = false;

        switch (tab) {
            case 'follow':
                const followersRequest: IHttpReq = {
                    url: '/api/user/subscribe/following/' + this.userId,
                    method: 'GET'
                };
                this.loading = true;
                this.httpHandler.sendRequest(followersRequest)
                    .then(
                        (followingUsers) => {
                            const followingUsersId = followingUsers.map(user => {
                                return user._id;
                            });
                            (<any>this.filter).userId = {
                                '$in': followingUsersId
                            };

                            this.loadArticles();
                        }
                    );
                break;
            case 'all':
                (<any>this.filter).userId = null;
                delete (<any>this.filter).userId;
                this.loadArticles();
                break;
            case 'my':
                this.linksToEdit = true;
                (<any>this.filter).userId = this.userId;
                this.loadArticles();
                break;
        }
    }

    setSearch(search) {
        if (search === this.lastSearch) {
            return;
        }
        this.loading = true;
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.executeSearch(search);
        }, 1500);
    }

    executeSearch(search) {
        if (this.lastSearch === search) {
            return;
        }
        this.lastSearch = search;
        (<any>this.filter).search = search;

        clearTimeout(this.searchTimeout);

        this.articles = [];
        if (!search) {
            (<any>this.filter).search = null;
            delete (<any>this.filter).search;
            this.loadArticles();
        } else {
            this.searchArticles(search);
        }
    }

    loadArticles() {
        if ((<any>this.filter).search && this.lastSearch !== '') {
            this.searchArticles(this.lastSearch);
            return;
        }
        const request: IHttpReq = {
            url: `/api/articles/filter/${encodeURIComponent(this.encryptService.encrypt(this.filter))}`,
            method: 'GET',
            body: {}
        };

        this.loading = true;

        this.httpHandler.sendRequest(request)
            .then((result) => {
                if (result.length === 0) {
                    return;
                }

                result = result.map(item => {
                    if (item.userId) {
                        item.user = item.userId;
                    }
                    item.previewHTML = this.markdownService.convert(item.preview);

                    return item;
                });

                this.articles = result;
            }).then(() => {
            this.loading = false;
            console.log(this.articles);
        });
    }

    searchArticles(search) {
        const request: IHttpReq = {
            url: `/api/articles/search/${encodeURIComponent(this.encryptService.encrypt(this.filter))}`,
            method: 'GET'
        };

        this.loading = true;

        this.httpHandler.sendRequest(request)
            .then((result) => {
                if (result.length === 0) {
                    return;
                }

                result = result.map(item => {
                    if (item.user) {
                        item.user = item.user.shift();
                    }
                    item.previewHTML = this.markdownService.convert(item.preview);

                    return item;
                });

                this.articles = result;
            }).then(() => {
            this.loading = false;
        });
    }

}
