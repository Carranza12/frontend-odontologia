import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    this.redirectToDashboard(userString);
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
    if(this.loginForm.invalid){
      Swal.fire(
        'Oops...',
        'Por favor rellena los campos vacios.',
        'error'
      )
    }
    console.log("MEME PUNETAS:", this.loginForm)
    if (this.loginForm.valid) {
      const formData: any = this.loginForm.value;
      this.authService.login(formData).subscribe(
        (token) => {
          const userString = localStorage.getItem('user');
          this.redirectToDashboard(userString);
        },
        (error) => {
          if(error.status ===401){
            Swal.fire(
              'Oops...',
              'Las credenciales son incorrectas. Favor de hablar con un administrador.',
              'error'
            )
          }
          console.error('Error:', error);
        }
      );
    } else {
    }
  }
}
