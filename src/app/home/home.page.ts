import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { OriginalService } from '../original.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  city: {
    id: string;
    name: string;
  }[] = [];
  select: number = 0;
  prefecture = [
    { lavel: "北海道" },
    { lavel: "青森県" },
    { lavel: "東京都" }
  ];

  constructor(
    public original: OriginalService,
    public loadingController: LoadingController,
  ) {
    this.prefecture;
    this.select;
  }

  async ionViewDidEnter() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    if (!this.city.length) {
      await loading.present();
    }

    this.original.getCity().subscribe(res => {
      for (let post of JSON.parse("[" + res + "]")) {
        for (let data of post['data']) {
          let cal_id: number = 0;
          for (let j = 0; j < 5; j++) {
            cal_id += data["id"][j] * (6 - j);
          }
          cal_id = 11 - cal_id % 11;
          if (String(cal_id).length == 2) {
            cal_id = Number(String(cal_id)[1]);
          }
          this.city.push({id: data["id"] + cal_id, name: data["name"]});
        }
      }
    })
    loading.dismiss();
  }

  trackByFn(index, item): number {
    return item.ID;
  }

  selectPrefecture(idx): void{
    this.select = idx;
    console.log(idx);
  }

}
