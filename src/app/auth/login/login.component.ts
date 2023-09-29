import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm = this.formBuilder.group({
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });
  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Datos del formulario:', formData);
    } else {
      console.log("los datos son invalidos.")
    }
  }
}
