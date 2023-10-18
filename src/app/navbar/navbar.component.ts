import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  signOut() {
    localStorage.clear();
  }

  userLoggedIn() {
    var ok;
    try {
      ok = false;
      if (localStorage.getItem('user') !== null || '') {
        return (ok = true);
      }
      return ok;
    } catch {
      return false;
    }
  }
}
