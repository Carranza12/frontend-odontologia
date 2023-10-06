import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const user_string = localStorage.getItem('user');
    let user:any;
    if(user_string){
        user = JSON.parse(user_string);
    }

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);

        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp > currentTimestamp) {
            if(user.role_default !== "trabajador"){
                this.router.navigate(['/403']);
                return false;
            }
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
