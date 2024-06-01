import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm = this.formBuilder.group({
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show()
    const userString = localStorage.getItem('user');
    this.redirectToDashboard(userString);
    this.loadingService.hide()
  }

  public redirectToDashboard(userString: any) {
    if (userString) {
      const user = JSON.parse(userString);
      if (user.role_default) {
        this.router.navigateByUrl('/' + user.role_default);
      } else {
        this.router.navigate(['/auth/login']);
      }
    }
  }

  onSubmit() {
    this.loadingService.show()
    if(this.loginForm.invalid){
      Swal.fire(
        'Oops...',
        'Por favor rellena los campos vacios.',
        'error'
      )
    }
  
    if (this.loginForm.valid) {
      const formData: any = this.loginForm.value;
      this.authService.login(formData).subscribe(
        (token) => {
          const userString = localStorage.getItem('user');
          this.redirectToDashboard(userString);
          this.loadingService.hide()
        },
        (error) => {
          this.loadingService.hide()
          if(error.status ===401){
            Swal.fire(
              'Oops...',
              'Las credenciales son incorrectas. Favor de hablar con un administrador.',
              'error'
            )
          }
          this.loadingService.hide()
          console.error('Error:', error);
        }
      );
    } else {
    }
  }
}
