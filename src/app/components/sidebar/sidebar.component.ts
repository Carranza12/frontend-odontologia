import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public userData!: any;
  public sessionExpirationTime: string = '';
  public profile_picture!:string;
  public actual_path!:string;

  constructor(private authService: AuthService, private _router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const user_json = localStorage.getItem('user');
    if (user_json) {
      this.userData = JSON.parse(user_json);
      this.profile_picture = this.userData.img
    }

    this.route.url.subscribe(urlSegments => {
      if(urlSegments[0]){
        this.actual_path = urlSegments[0].path;
      }
      
    });

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const expirationTimestamp = decodedToken.exp;
        const expirationDate = new Date(expirationTimestamp * 1000);
        this.sessionExpirationTime = expirationDate.toLocaleTimeString();
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
