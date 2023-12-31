// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      head: string;
      body: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      extra: any;
    }
  ) {}
}
