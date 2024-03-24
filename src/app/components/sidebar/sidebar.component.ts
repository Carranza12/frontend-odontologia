import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public userData!: any;
  public sessionExpirationTime: string = '';
  public profile_picture!: string;
  public actual_path!: string;
  public showMenu: boolean = false;

  public modalIsOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const user_json = localStorage.getItem('user');
    if (user_json) {
      this.userData = JSON.parse(user_json);
      console.log("this.userData.img:", this.userData.img)     
      let srcImage = this.userData.img;
      srcImage = srcImage.replace("148.212.195.49", "192.168.1.27")
      this.profile_picture = 'http://' + srcImage;
      console.log("this.profile_picture:", this.profile_picture)
    }

    this.route.url.subscribe((urlSegments) => {
      if (urlSegments[0]) {
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

  async logout(): Promise<void> {
    const result = await Swal.fire({
      title: '¿Estás seguro de que desea cerrar sesion?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      icon: 'question',
    });

    if (result.isConfirmed) {
      try {
        this.authService.logout();
      } catch (error) {
        console.error(error);
      }
    }
  }

  public navigateBy(url: string) {
    this._router.navigateByUrl(url);
  }

  public openMenu() {
    this.showMenu = true;
    this.modalIsOpen = true;
  }

  public closeMenu() {
    this.showMenu = false;
    this.modalIsOpen = false;
  }
}
