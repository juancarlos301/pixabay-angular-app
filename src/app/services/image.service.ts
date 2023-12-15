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

  getImages(
    term: string,
    imagesPerPage: number,
    currentPage: number
  ): Observable<any> {
    const key = 'pon la tuya';
    const URL = `https://pixabay.com/api/?key=${key}&q=${term}&per_page=${imagesPerPage}&page=${currentPage}`;

    return this.http.get(URL);
  }
}
