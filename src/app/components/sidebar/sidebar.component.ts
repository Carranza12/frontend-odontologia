import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public userData!: any;
  public sessionExpirationTime: string = ''; // Nueva propiedad

  constructor(private authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    const user_json = localStorage.getItem('user');
    if (user_json) {
      this.userData = JSON.parse(user_json);
    }

    // Decodificar y formatear el tiempo de expiración
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const expirationTimestamp = decodedToken.exp;
        const expirationDate = new Date(expirationTimestamp * 1000);
        this.sessionExpirationTime = expirationDate.toLocaleTimeString(); // Formatea la hora legible
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }

  public logout(): void {
    this.authService.logout();
  }

  public navigateBy(url: string) {
    this._router.navigateByUrl(url);
  }
}
