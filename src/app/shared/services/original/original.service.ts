import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {finalize, map, tap} from 'rxjs/operators';
import {LoadingController} from '@ionic/angular';
import {Observable} from 'rxjs';

export interface ICompany {
  name: string;
  corporationId: string;
  postalCode: string;
  add: string;
  president: string;
  capital: string;
  sales: string;
}

@Injectable({
  providedIn: 'root',
})
export class OriginalService {
  constructor(public http: HttpClient, private loadingController: LoadingController) {}

  getCity(showLoad: boolean): Observable<{ data: any }> {
    if (showLoad) {
      this.loadingController.create({
        message: 'Loading...',
      }).then(loading => loading.present());
    }

    return this.http.get<{ data: any }>(environment.api + 'city')
      .pipe(
        finalize(() => this.loadingController.dismiss())
      );
  }

  getCompany(id: string): Observable<ICompany[]> {
    const body = {
      id,
    };
    return this.http.post(environment.api + 'company', body)
      .pipe(
        map(data => JSON.parse('' + data).results.map(c => ({
              name: c.name,
              corporationId: `${c['corporationId']}`.replace(/null/g, ''),
              postalCode: `${c['postalCode']}`.replace(/null/g, ''),
              add: `${c['prefecture']} ${c['city']} ${c['town']} ${c['block']} ${c['building']}`.replace(/null/g, ''),
              president: `${c['presidentPosition']} ${c['presidentName']}`.replace(/null/g, ''),
              capital: `${c['capital']}`.replace(/null/g, ''),
              sales: `${c['sales']}`.replace(/null/g, ''),
            } as ICompany)))
      );
  }
}
