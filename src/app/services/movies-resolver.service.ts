import { Injectable } from '@angular/core';
import { IMovie } from 'src/app/models/movie';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';

@Injectable({
    providedIn: 'root'
})
export class MoviesResolver implements Resolve<IMovie[]> {
    constructor(private _movieService: MoviesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMovie[]> {
        return this._movieService.getMovies();
    }

}
