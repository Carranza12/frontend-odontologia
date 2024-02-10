import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.backendHost+'/api/auth/login';

  constructor(private http: HttpClient, private _router:Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post<any>(this.apiUrl, credentials)
      .pipe(
        map((response) => {
          const token = response.token;
          console.log("response:", response)
          const user = {
            fullName: response.full_name,
            roles: response.roles,
            role_default: response.role_default,
            email: response.email,
            img: response.profileImage,
            user_id: response.user_id
          };
          console.log("user auth:", user)
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          return token;
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    console.log("tokenPayload:", tokenPayload)
    return tokenPayload.role;
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._router.navigateByUrl("/auth/login")
  }
}
