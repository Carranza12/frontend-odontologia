import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);

        const currentTimestamp = Math.floor(Date.now() / 1000);
        console.log("expiracion del token:", decodedToken.exp)
        if (decodedToken.exp && decodedToken.exp > currentTimestamp) {
          return true;
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
    return false;
  }
}
