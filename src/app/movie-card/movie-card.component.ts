import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
} from '@angular/core';
import { ApiFetch } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';

import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input() profileFilter: boolean = false;

  movies: any[] = [];
  favMovies = JSON.parse(localStorage.getItem('user')!).FavoriteMovies;
  isFavorite = false;
  @ViewChild('box', { static: true }) box!: ElementRef;

  constructor(
    public fetchApi: ApiFetch,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getMovies(this.profileFilter);
    this.setColumns();
  }
  public columns: any;

  ngAfterViewInit() {
    // this.setColumns();
  }

  setColumns(): any {
    let col = Math.floor(this.box.nativeElement.clientWidth / 275);
    if (this.movies.length < col) {
      return (this.columns = this.movies.length);
    } else return (this.columns = col);
  }

  addToFavorites(movieID: string, movieTitle: string) {
    this.fetchApi.addFavoriteMovie(movieID).subscribe((resp: any) => {
      localStorage.setItem('user', JSON.stringify(resp.success));
      this.favMovies = JSON.parse(localStorage.getItem('user')!).FavoriteMovies;
      console.log(this.favMovies);
      this.snackBar.open(movieTitle + ' added to favorites.', 'OK', {
        duration: 2500,
        verticalPosition: 'top',
      });
    }).unsubscribe;
  }

  removeFromFavorites(movieID: string, movieTitle: string) {
    this.fetchApi.removeFavoriteMovie(movieID).subscribe((resp: any) => {
      localStorage.setItem('user', JSON.stringify(resp.success));
      this.favMovies = JSON.parse(localStorage.getItem('user')!).FavoriteMovies;
      console.log(this.favMovies);
      this.snackBar.open(movieTitle + ' removed from favorites.', 'OK', {
        duration: 2500,
        verticalPosition: 'top',
      });
    }).unsubscribe;
  }

  checkFavorite(movieID: any): boolean {
    return (this.isFavorite = this.favMovies.includes(movieID));
  }

  getMovies(profileFilter: boolean): void {
    this.fetchApi.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      if (this.profileFilter === true) {
        this.movies = this.movies.filter((movie) =>
          this.favMovies.includes(movie._id)
        );
      }
      return this.movies;
    }).unsubscribe;
  }

  openGenreDialog(genre: any) {
    this.fetchApi.getOneGenre(genre).subscribe((resp: any) => {
      this.dialog.open(MovieDetailsComponent, {
        data: {
          head: resp.Name,
          body: resp.Description,
        },
      });
      return resp;
    }).unsubscribe;
  }
  openDirectorDialog(director: any): void {
    this.fetchApi.getOneDirector(director).subscribe((resp: any) => {
      this.dialog.open(MovieDetailsComponent, {
        data: {
          head: resp.Name,
          body: resp.Bio,
          extra: 'Birthyear: ' + resp.Birthyear,
        },
      });
      return resp;
    }).unsubscribe;
  }
  openDescriptionDialog(title: any, description: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        head: title,
        body: description,
      },
    });
  }
}
