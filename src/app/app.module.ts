import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesService } from 'src/app/services/movies.service';
import { HttpClientModule } from '@angular/common/http';
import { PagerService } from 'src/app/services/pager.service';
import { SortDirective } from './shared/sort.directive';
import { FilterDirective } from './shared/filter.directive';
import { RouterModule } from '@angular/router';
import { MoviesResolver } from 'src/app/services/movies-resolver.service';


@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    SortDirective,
    FilterDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'movies', component: MoviesListComponent, resolve: { initData: MoviesResolver } },
      { path: '', redirectTo: 'movies', pathMatch: 'full' },
      { path: '**', redirectTo: 'movies', pathMatch: 'full' }
    ])
  ],
  providers: [MoviesService,
    PagerService,
    MoviesResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
