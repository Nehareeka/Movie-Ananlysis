import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Movie Analysis';

  public toggleDarkLight() {

    let body = document.getElementsByTagName("body")[0];
    let currentClass = body.className;
    body.className = currentClass === "dark-mode" ? "light-mode" : "dark-mode";
  }
}
