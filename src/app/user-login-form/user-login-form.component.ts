// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { ApiFetch } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApi: ApiFetch,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApi.userLogin(this.userData).subscribe(
      (result) => {
        this.router.navigate(['movies']);
        console.log('signed in as: ' + result.user.Username);
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        localStorage.setItem('favMovies', result.user.FavoriteMovies);
        // let FavoriteMovies = localStorage.getItem('favMovies');
        // console.log(FavoriteMovies);

        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('signed in as: ' + result.user.Username, 'OK', {
          duration: 2000,
          verticalPosition: 'top',
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    ).unsubscribe;
  }
}
