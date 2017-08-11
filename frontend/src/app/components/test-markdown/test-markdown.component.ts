import { Component, OnInit } from '@angular/core';
import { MarkdownService } from '../../services/markdown.service';

@Component({
    selector: 'app-test-markdown',
    providers: [MarkdownService],
    templateUrl: './test-markdown.component.html',
    styleUrls: ['./test-markdown.component.scss']
})
export class TestMarkdownComponent implements OnInit {
    convertedText: string;
    rawText = `
[More](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
# H1
## H2
### H3
#### H4
##### H5
###### H6

[I'm an inline-style link](https://www.google.com)

Inline-style pic:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

---

Hyphens

***

Asterisks

___

Underscores

# Tables

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | \`renders]\` | **nicely**
1 | 2 | 3

`;

    constructor(private markdownService: MarkdownService) {
    }

    ngOnInit() {
        this.updateOutput(this.rawText);
    }

    updateOutput(mdText: string) {
        this.convertedText = this.markdownService.convert(mdText);
    }

}
