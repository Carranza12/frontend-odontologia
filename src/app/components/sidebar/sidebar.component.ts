import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
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
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const user_json = localStorage.getItem('user');
    if (user_json) {
      this.userData = JSON.parse(user_json);   
      let srcImage = this.userData.img;
      srcImage = srcImage.replace("148.212.195.49", "192.168.1.27")
      this.profile_picture = 'http://' + srcImage;
    }

    this.route.url.subscribe((urlSegments) => {
      if (urlSegments[0]) {
        this.actual_path = urlSegments[0].path;
      }
    });

    const INACTIVITY_LIMIT = 1 * 60 * 1000; // 1 minuto en milisegundos
let inactivityTimeout: number | undefined;
let sessionExpired = false;

const resetInactivityTimeout = (): void => {
  if (sessionExpired) return;
  
  clearTimeout(inactivityTimeout);
  inactivityTimeout = window.setTimeout(() => {
    showInactivityModal();
  }, INACTIVITY_LIMIT);
};


const showInactivityModal = (): void => {
  sessionExpired = true;
  localStorage.setItem('sessionExpired', 'true');

  // Mostrar el modal
  const modal = document.getElementById('inactivityModal') as HTMLElement;
  modal.style.display = 'block';
  
  // Botón para cerrar sesión
  const logoutButton = document.getElementById('logoutButton') as HTMLInputElement;
  logoutButton.onclick = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('loginEmail');
    localStorage.removeItem('sessionExpired');
    window.location.href = 'auth/login';
  };
  
  // Botón para extender la sesión
  const extendSessionButton = document.getElementById('extendSessionButton') as HTMLInputElement;
  extendSessionButton.onclick = (): void => {
    const emailField = document.getElementById('emailField') as HTMLInputElement;
    const email = emailField.value.trim();
    const storedEmail = localStorage.getItem('loginEmail');

    if (email === '' || email !== storedEmail) {
      alert('El correo electrónico es incorrecto. Por favor, ingrese el correo correcto.');
      return;
    }

    sessionExpired = false;
    resetInactivityTimeout();
    localStorage.removeItem('sessionExpired');
    modal.style.display = 'none';
    emailField.value = '';
  };
};

// Eventos que resetean el temporizador de inactividad
document.addEventListener('mousemove', resetInactivityTimeout);
document.addEventListener('keydown', resetInactivityTimeout);
document.addEventListener('scroll', resetInactivityTimeout);

const checkTokenExpiration = (): void => {
  const token = localStorage.getItem('token');
  const sessionExpired = localStorage.getItem('sessionExpired') === 'true'; // Leer el estado de la sesión expirada

  if (sessionExpired) {
    showInactivityModal();
    return;
  }
  if (token) {
    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const expirationTimestamp = decodedToken.exp;
      const currentTime = new Date().getTime();
      
      if (currentTime >= expirationTimestamp * 1000) {
        console.log('Token ha expirado, eliminando token...');
        showInactivityModal();
      } else {
        resetInactivityTimeout();
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }
};

// Llama a checkTokenExpiration al cargar la página
checkTokenExpiration();
resetInactivityTimeout();

    //Aqui se controla el tiempo para que la sesion expire, guarda el token en el localstorage.
   /* const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const expirationTimestamp = decodedToken.exp;
        //este apartado selecciona el tiempo que se asigna a la sesion.
        const expirationDate = new Date(expirationTimestamp * 1000);
        this.sessionExpirationTime = expirationDate.toLocaleTimeString();
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }*/
      
      

          /*
      const INACTIVITY_LIMIT = 1 * 60 * 1000; // 5 minutos en milisegundos
      let inactivityTimeout: any;
      let sessionExpired = false;
      
      const resetInactivityTimeout = () => {
        if (sessionExpired) return;
        
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => {
          showInactivityAlert();
        }, INACTIVITY_LIMIT);
      };
      
      const showInactivityAlert = () => {
        sessionExpired = true;
      
        // Mostrar la alerta de inactividad utilizando SweetAlert2
        Swal.fire({
          title: 'Sesión Expirada',
          text: 'Su sesión ha expirado debido a inactividad. Por favor, vuelva a iniciar sesión.',
          html: `<p>Su sesión ha expirado debido a inactividad. Por favor, ingrese su correo electrónico para extender la sesión.</p>
                <input type="text" id="emailField" class="swal2-input" placeholder="Ingresa tu Correo">`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Volver al Inicio',
          cancelButtonText: 'Extender la Sesion',
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            // Limpiar el token del localStorage y redirigir al usuario a la página de inicio de sesión
            localStorage.removeItem('token');
            window.location.href = 'auth/login';
          }else if (result.dismiss) {
            const email = (document.getElementById('emailField') as HTMLInputElement).value;
               sessionExpired = false; 
              resetInactivityTimeout();     
          }
        });
      };
      
      
      // Eventos que resetean el temporizador de inactividad
      document.addEventListener('mousemove', resetInactivityTimeout);
      document.addEventListener('keydown', resetInactivityTimeout);
      document.addEventListener('scroll', resetInactivityTimeout);
      
      const checkTokenExpiration = () => {
        // Aquí se controla el tiempo para que la sesión expire, guarda el token en el localStorage.
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decodedToken: any = jwtDecode(token);
            const expirationTimestamp = decodedToken.exp;
            // Este apartado selecciona el tiempo que se asigna a la sesión.
            const expirationDate = new Date(expirationTimestamp * 1000);
            this.sessionExpirationTime = expirationDate.toLocaleTimeString();
      
            // Verificar si el token ha expirado
            const currentTime = new Date().getTime();
            if (currentTime >= expirationTimestamp * 1000) {
              console.log('Token ha expirado, eliminando token...');
              showInactivityAlert();
            } else {
              // Reiniciar el temporizador de inactividad si el token sigue siendo válido
              resetInactivityTimeout();
            }
          } catch (error) {
            console.error('Error al decodificar el token:', error);
          }
        }
      };
      
      // Llama a checkTokenExpiration al cargar la página
      checkTokenExpiration();
      resetInactivityTimeout();*/
      

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
        this.loadingService.show()
        await new Promise(resolve => setTimeout(resolve, 500));
        this.authService.logout();
        this.loadingService.hide()
      } catch (error) {
        console.error(error);
        this.loadingService.hide()
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
