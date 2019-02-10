import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/models/movie';
import { PagerService } from 'src/app/services/pager.service';
import { SortDirective } from '../shared/sort.directive';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  // array of all items to be paged
  private moviesInfo: IMovie[];
  // paged items
  pagedItems: IMovie[];
  public columns: Array<any> = [];
  // pager object
  pager: any = {};

  public config: any;
  private pageTitle: string = 'Here is a list of popular movies: ';
  constructor(private _pagerService: PagerService,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.moviesInfo = this.route.snapshot.data['initData'];
    this.setPage(1);
    this.initTable();
  }

  setPage(page: number, data: IMovie[] = this.moviesInfo) {
    // get pager object from service
    this.pager = this._pagerService.getPager(data.length, page);

    // get current page of items
    this.pagedItems = data.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  initTable() {
    Object.keys(this.moviesInfo[0]).forEach((item: string) => {
      if (item === "Imdb") {
        this.columns.push({
          title: item, sort: false
        });
      } else {
        this.columns.push({
          title: item, sort: '',
          filtering: { filterString: '', placeholder: 'Filter by ' + item }
        });
      }
    });
    this.config = {
      sorting: { columns: this.columns },
      filtering: { filterString: '' }
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

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.title].toString().match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.title].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
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
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
    let filteredData = this.changeFilter(this.moviesInfo, this.config);
    // let data = this.moviesInfo.slice(0);
    let sortedData = this.changeSort(filteredData, this.config);
    this.setPage(1, sortedData);
  }

}
