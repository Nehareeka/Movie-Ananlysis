import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { PagerService } from 'src/app/services/pager.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  private moviesInfo: Movie;
  // paged items
  pagedItems: Movie[];
  // pager object
  pager: any = {};
  // array of all items to be paged
  private allItems: any[];
  private pageTitle: string = 'Here is a list of popular movies: ';
  constructor(private _movieService: MoviesService, private _pagerService: PagerService) { }

  ngOnInit() {
    this._movieService.getMovies()
    .subscribe(response => {
      this.moviesInfo = <Movie>response;
      this.allItems = response;
      // initialize to page 1
      this.setPage(1);
    });
  }
  setPage(page: number) {
      // get pager object from service
      this.pager = this._pagerService.getPager(this.allItems.length, page);

      // get current page of items
      this.pagedItems = <Movie[]>this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
