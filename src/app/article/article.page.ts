import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { OriginalService } from '../original.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  id: string;
  company: {
    name: string;
    corporationId: string;
    postalCode: string;
    add: string;
    president: string;
    capital: string;
    sales: string;
  }[] = [];

  constructor(public route: ActivatedRoute, public orijinal: OriginalService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('articleId');
    });
  }

  ionViewDidEnter() {
    this.orijinal.getCompany(this.id).subscribe((res) => {
      for (let c of JSON.parse('' + res)['results']) {
        this.company.push({
          name: c['name'],
          corporationId: `${c['corporationId']}`.replace(/null/g, ''),
          postalCode: `${c['postalCode']}`.replace(/null/g, ''),
          add: `${c['prefecture']} ${c['city']} ${c['town']} ${c['block']} ${c['building']}`.replace(/null/g, ''),
          president: `${c['presidentPosition']} ${c['presidentName']}`.replace(/null/g, ''),
          capital: `${c['capital']}`.replace(/null/g, ''),
          sales: `${c['sales']}`.replace(/null/g, ''),
        });
      }
    });
  }
}
