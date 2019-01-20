import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovie, Movie } from 'src/app/models/movie';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
private _movieUrl = 'http://starlord.hackerearth.com/movies';

  constructor(private _http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  getMovies(): Observable<IMovie[]> {
   // to enable CORS request and retrive data from server
   const proxyurl = "https://cors-anywhere.herokuapp.com/";

      return this._http.get(proxyurl + this._movieUrl)
      .pipe(map((response: any) => <IMovie[]>response.map(movie => new Movie(movie.movie_title,
          movie.director_name,
          movie.actor_1_name,
          movie.actor_2_name,
          movie.language,
          movie.country,
          movie.content_rating,
          movie.genres,
          Number(movie.budget),
          Number(movie.title_year),
          movie.movie_imdb_link)))
      );
  }
}
