import { Injectable } from '@angular/core';
import * as marked from 'marked';

@Injectable()
export class MarkdownService {
    md;

    /* https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
    *
    *                       How to use
    *in tag
    *       [innerHtml] = "convertedText"
    *in component code
    *       convertedText = markdownService.convert(markdownText)
    * */

    constructor() {
        this.md = marked;
        const render = new this.md.Renderer();
        render.blockquote = (quote: string) => {
            return `<blockquote class="markdown-quote">${quote}</blockquote>`;
        };
        render.table = (header: string, body: string) => {
            return `
                    <table class="markdown-table">
                        <thead>
                            ${header}
                        </thead>
                        <tbody>
                            ${body}
                        </tbody>
                    </table>
                    `;
        };
        render.link = (href: string, title: string, text: string) => {
            return `<a class="markdown-link" href="${href}" title="${title}">${text}</a>`;
        };
        this.md.setOptions({
            renderer: render,
            sanitize: true,
        });
    }

    convert(markdown: string) {
        return this.md.parse(markdown);
    }
}
