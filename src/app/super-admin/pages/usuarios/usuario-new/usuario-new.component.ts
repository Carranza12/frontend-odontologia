import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-usuario-new',
  templateUrl: './usuario-new.component.html',
  styleUrls: ['./usuario-new.component.scss'],
})
export class UsuarioNewComponent implements OnInit {
  public userForm = this.formBuilder.group({
    name: ['', Validators.required],
    last_name: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    profileImage: [''],
  });

  public departamento: FormControl = new FormControl('', Validators.required);
  public puesto: FormControl = new FormControl('', Validators.required);
  public showTrabajadorInputs: boolean = false;
  constructor(
    public _general: GeneralService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
  this.userForm.get("role")?.valueChanges.subscribe((valor) =>{
    if(valor === "trabajador"){
      this.showTrabajadorInputs = true;
    }
    if(valor === "superAdmin"){
      this.showTrabajadorInputs = false;
    }
  })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.userForm?.get('profileImage')?.setValue(file);
  }

  
  
  onSubmit() {
    if (this.userForm.valid) {
      let formUser: any = this.userForm.value;

      const formData = new FormData();

    formData.append('name', formUser.name);
    formData.append('last_name', formUser.last_name);
    formData.append('password', formUser.password);
    formData.append('role', formUser.role);
    formData.append('email', formUser.email);

    const profileImage = this.userForm.get('profileImage')?.value;
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
      if(formUser.role === "trabajador" && this.departamento.valid && this.puesto.valid){
        formUser.departamento = this.departamento.value;
        formUser.puesto = this.puesto.value
        formData.append('departamento', formUser.departamento);
        formData.append('puesto', formUser.puesto);
      }
      console.log("form data:", formData)

      this.apiService.registerUser(formData).subscribe(
        (response:any) => {
          console.log('Usuario registrado con éxito', response);
          this.userForm.reset();
          this._general.navigateBy("/superAdmin/usuarios")
        },
        (error:any) => {
          console.error('Error al registrar el usuario', error);
        }
      );
    } else {
    }
  }
}
