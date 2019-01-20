import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesService } from 'src/app/services/movies.service';
import { HttpClientModule } from '@angular/common/http';
import { PagerService } from 'src/app/services/pager.service';
import { SortDirective } from './shared/sort.directive';
import { FilterDirective } from './shared/filter.directive';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    SortDirective,
    FilterDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [MoviesService,
  PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
