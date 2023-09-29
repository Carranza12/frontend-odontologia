import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
      if (user.role) {
        this.router.navigateByUrl('/' + user.role);
      } else {
        this.router.navigate(['/auth/login']);
      }
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData: any = this.loginForm.value;
      this.authService.login(formData).subscribe(
        (token) => {
          const userString = localStorage.getItem('user');
          this.redirectToDashboard(userString);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
    }
  }
}
