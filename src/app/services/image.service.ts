import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private error$ = new Subject<string>();
  private search$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  setError(message: string) {
    this.error$.next(message);
  }

  getError(): Observable<string> {
    return this.error$.asObservable();
  }

  sendSearch(term: string) {
    this.search$.next(term);
  }

  getSearch(): Observable<string> {
    return this.search$.asObservable();
  }

  getImages(term: string): Observable<any> {
    const key = '41244132-5d9f4077610c8c80a9e96893b';
    const URL = `https://pixabay.com/api/?key=${key}&q=${term}`;

    return this.http.get(URL);
  }
}
