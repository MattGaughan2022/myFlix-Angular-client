import { Component } from '@angular/core';

// finally able to ghpage deploy with
// ng build --base-href "https://mattgaughan2022.github.io/myFlix-Angular-client/"
// or ngh

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'myFlix-Angular-client';
}
