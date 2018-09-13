import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { PagerService } from 'src/app/services/pager.service';
import { SortDirective } from '../shared/sort.directive';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  // array of all items to be paged
  private moviesInfo: Movie[];
  // paged items
  pagedItems: Movie[];
  public columns: Array<any> = [];
  // pager object
  pager: any = {};

  public config: any;
  private pageTitle: string = 'Here is a list of popular movies: ';
  constructor(private _movieService: MoviesService, private _pagerService: PagerService) { }

  ngOnInit() {
    this._movieService.getMovies()
      .subscribe((response: any) => {
        this.moviesInfo = response;
        // initialize to page 1
        this.setPage(1);
        this.initTable();
      });
  }

  setPage(page: number, data: Movie[] = this.moviesInfo) {
    // get pager object from service
    this.pager = this._pagerService.getPager(data.length, page);

    // get current page of items
    this.pagedItems = data.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  initTable() {
    Object.keys(this.moviesInfo[0]).forEach((item: string) => {
      if (item === "Imdb" || item === "Language") {
        this.columns.push({
          title: item, sort: false
        });
      } else {
        this.columns.push({
          title: item, sort: '',
          filtering: { filterString: '', placeholder: 'Filter by position' }
        });
      }
    });
    this.config = {
      sorting: { columns: this.columns }
    };
  }

  public get configColumns(): any {
    let sortColumns: Array<any> = [];

    this.columns.forEach((column: any) => {
      if (column.sort) {
        sortColumns.push(column);
      }
    });

    return { columns: sortColumns };
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].title;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public onChangeTable(column: any): void {
    this.columns.forEach((col: any) => {
      if (col.title !== column.title) {
        col.sort = '';
      }
    });
    this.tableChanged({ sorting: this.configColumns });
  }

  public tableChanged(config: any) {
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
    let data = this.moviesInfo.slice(0);
    let sortedData = this.changeSort(data, this.config);
    this.setPage(1, sortedData);
  }

}
