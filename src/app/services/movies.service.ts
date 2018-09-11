import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
private _movieUrl = '../assets/movie.json';
  constructor(private _http: Http) { }

  getMovies(): Observable<any> {
      return this._http.get(this._movieUrl)
      .pipe(map(response => response.json()));
  }
}
