import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovie } from 'src/app/models/movie';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private _movieUrl = 'http://starlord.hackerearth.com/movies';

  constructor(private _http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  getMovies(): Observable<IMovie[]> {
    // to enable CORS request and retrive data from server
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    return this._http.get(proxyurl + this._movieUrl)
      .pipe(map((response: any) => response.map(movie => <IMovie>{
        Title: movie.movie_title,
        Director: movie.director_name,
        Actor1: movie.actor_1_name,
        Actor2: movie.actor_2_name,
        Language: movie.language,
        Country: movie.country,
        Rating: movie.content_rating,
        Genres: movie.genres,
        Budget: Number(movie.budget),
        Year: Number(movie.title_year),
        Imdb: movie.movie_imdb_link
      }
      ))
      );
  }
}
