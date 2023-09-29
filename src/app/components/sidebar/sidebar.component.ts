import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public userData!: any;
  constructor(private authService: AuthService, private _router:Router) {}

  ngOnInit(): void {
    const user_json = localStorage.getItem('user');
    if (user_json) {
      this.userData = JSON.parse(user_json);
    }
  }

  public logout(): void {
    this.authService.logout();
  }

  public navigateBy(url:string){
    this._router.navigateByUrl(url)
  }


}
