import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import {ICompany, OriginalService} from '../shared/services/original/original.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  id: string;
  company: ICompany[] = [];

  constructor(public route: ActivatedRoute, public orijinal: OriginalService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('articleId');
    });
  }

  ionViewDidEnter() {
    this.orijinal.getCompany(this.id).subscribe((res) => {
      this.company = res;
    });
  }
}
