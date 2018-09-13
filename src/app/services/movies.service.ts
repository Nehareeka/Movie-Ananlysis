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

  getMovies(): Observable<Movie[]> {
      return this._http.get(this._movieUrl)
      .pipe(map(response => <Movie[]>response.json().map(movie => new Movie(movie.movie_title,
          movie.director_name,
          movie.actor_1_name,
          movie.actor_2_name,
          movie.language,
          movie.country,
          movie.content_rating,
          Number(movie.budget),
          Number(movie.title_year),
          movie.movie_imdb_link)))
      );
  }
}
