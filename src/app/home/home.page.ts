import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { OriginalService } from '../shared/services/original/original.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public city: {
    id: string;
    name: string;
  }[] = [];
  public select = 0;
  public prefecture = [{ lavel: '北海道' }, { lavel: '青森県' }, { lavel: '東京都' }];

  constructor(private original: OriginalService, private loadingController: LoadingController) {
  }

  async ionViewDidEnter() {
    this.city = [];
    this.original.getCity(!this.city.length).subscribe(async (res) => {
      for (const post of JSON.parse('[' + res + ']')) {
        for (const data of post.data) {
          let calId = 0;
          for (let j = 0; j < 5; j++) {
            calId += data.id[j] * (6 - j);
          }
          calId = 11 - (calId % 11);
          if (String(calId).length === 2) {
            calId = Number(String(calId)[1]);
          }
          this.city.push({ id: data.id + calId, name: data.name });
        }
      }
    });
  }

  trackByFn(index, item): number {
    return item.ID;
  }

  selectPrefecture(idx: number): void {
    this.select = idx;
    console.log(idx);
  }
}
