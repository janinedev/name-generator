import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProfile } from '../models/profile.model';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class ProfileService {
  private apiUrl: string;

  // private namesListSource = new Subject<any>();
  // private regionSource = new Subject<string>();
  // private genderSource = new Subject<string>();
  // private numRecordSource = new Subject<number>();

  // Observable stream
  // namesList$ = this.namesListSource.asObservable();
  // region$ = this.regionSource.asObservable();
  // gender$ = this.genderSource.asObservable();
  // numRecord$ = this.numRecordSource.asObservable();

  constructor(
    private httpClient: HttpClient) {
    this.apiUrl = 'https://uinames.com/api/'; // enhance: move to ENV
  }

  getNamesByCriteria(c: any): Observable<any> {
    let url = `${this.apiUrl}?region=${c.region}&gender=${c.gender}&amount=${c.amt}&ext`;
    return this.httpClient.get<IProfile>(url);
  }

  // setGender(g: string) {
  //   this.genderSource.next(g);
  // }

}
