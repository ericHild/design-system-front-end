import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Button } from '../models/button';
import { catchError, map, tap } from 'rxjs/operators';
import { Colors } from '../models/colors';

@Injectable({
  providedIn: 'root'
})
export class DesignSystemService {

  constructor(private httpClient: HttpClient) { }

  getButton(): Observable<Button> {
    return this.httpClient.get<Button>('http://localhost:3000/design-system/api/v1/button').pipe(
      map((data) => data));
  }

  getColors(): Observable<Colors> {
    return this.httpClient.get<Colors>('http://localhost:3000/design-system/api/v1/colors').pipe(
      map((data) => data));
  }
}
