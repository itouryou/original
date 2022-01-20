import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OriginalService {
  constructor(public http: HttpClient) {}

  getCity() {
    return this.http.get('http://localhost:8080/city');
  }

  getCompany(id: string) {
    const body = {
      id: id,
    };
    return this.http.post('http://localhost:8080/company', body);
  }
}
