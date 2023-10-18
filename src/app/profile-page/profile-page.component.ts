import { Component, Injectable, Input } from '@angular/core';
import { ApiFetch } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class ProfilePageComponent {
  constructor(
    public fetchApi: ApiFetch,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  @Input() userData = {
    currentUsername: '',
    newUsername: '',
    currentEmail: '',
    newEmail: '',
    oldPassword: '',
    newPassword1: '',
    newPassword2: '',
  };

  user: string = '';
  email: string = '';
  birthday: any = '';
  oldPassword: any = '';
  newPassword1: any = '';
  newPassword2: any = '';

  favMovies: any[] = [];

  passType: string[] = ['password', 'password', 'password'];

  currentUser: any = {};

  getUser() {
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
    this.user = this.currentUser.Username;
    this.email = this.currentUser.Email;
    this.birthday = this.currentUser.Birthday;
  }

  ngOnInit(): void {
    this.getUser();
  }

  changePasswordType(x: number) {
    if (this.passType[x] === 'password') {
      this.passType[x] = 'text';
    } else {
      this.passType[x] = 'password';
    }
  }

  handleUpdate() {
    // console.log('Hello  ' + JSON.stringify(this.userData));
    if (this.userData.newPassword1 !== this.userData.newPassword2) {
      alert('passwords do not match. try again.');
      return 0;
    } else {
      let sendData = {
        Username: this.userData.newUsername,
        OldPassword: this.userData.oldPassword,
        Password: this.userData.newPassword1,
        Email: this.userData.newEmail,
      };
      this.fetchApi.editUserInfo(sendData).subscribe((resp: any) => {
        // console.log('once', resp.status);
        // if (resp.status === 401) {
        //   alert('incorrect username or password. try again.');
        //   return 0;
        // } else if (resp.status !== (201 || 204)) {
        //   alert(
        //     'An error occurred, make sure information is entered correctly.'
        //   );
        //   return 0;
        // } else {
        // console.log(resp.status);
        localStorage.setItem('user', JSON.stringify(resp));
        this.getUser();
        this.snackBar.open('User profile updated...', 'OK', {
          duration: 2500,
          verticalPosition: 'top',
        });
        return this.router.navigate(['movies']);
      });
      return 1;
    }
  }

  handleDelete() {
    if (window.confirm('Are sure you want to delete your account?')) {
      this.fetchApi.deleteUserAccount().subscribe((resp: any) => {
        console.log('account deleted');
        this.snackBar.open('User profile deleted...', 'OK', {
          duration: 2500,
          verticalPosition: 'top',
        });
      });
      localStorage.clear();
      return this.router.navigate(['/']);
    } else {
      return 0;
    }
  }
}
