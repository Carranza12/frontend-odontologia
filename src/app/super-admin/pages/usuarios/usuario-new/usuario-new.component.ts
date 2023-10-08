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
    role_default: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    profileImage: [''],
  });

  public departamento: FormControl = new FormControl('', Validators.required);
  public puesto: FormControl = new FormControl('', Validators.required);
  public showTrabajadorInputs: boolean = false;

  public rolesSelectedList: any = [];
  public rolesAvailableList: any = [
    {
      value: 'superAdmin',
      text: 'superAdmin',
      selected: false,
    },
    {
      value: 'trabajador',
      text: 'trabajador',
      selected: false,
    },
    {
      value: 'estudiante',
      text: 'estudiante',
      selected: false,
    },
    {
      value: 'maestro',
      text: 'maestro',
      selected: false,
    },
  ];
  constructor(
    public _general: GeneralService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  public selectRole(role: any) {
    const indexMatch = this.rolesAvailableList.findIndex(
      (item: any) => item.value === role.value
    );
    this.rolesAvailableList[indexMatch].selected =
      !this.rolesAvailableList[indexMatch].selected;
    if (this.rolesAvailableList[indexMatch].selected) {
      this.rolesSelectedList.push(this.rolesAvailableList[indexMatch]);
    }
    if (!this.rolesAvailableList[indexMatch].selected) {
      const indexDelete = this.rolesSelectedList.findIndex(
        (item: any) => item.value === this.rolesAvailableList[indexMatch].value
      );
      this.rolesSelectedList.splice(indexDelete, 1);
    }

    this.rolesAvailableList.forEach((item: any) => {
      if (item.value === 'trabajador' && item.selected) {
        this.showTrabajadorInputs = true;
      }
      if (item.value === 'trabajador' && !item.selected) {
        this.showTrabajadorInputs = false;
      }
    });
  }

  ngOnInit(): void {}

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
      formData.append('role_default', formUser.role_default);
      formData.append('email', formUser.email);
      this.rolesSelectedList.forEach((item: any) => {
        formData.append('roles', item.value);
      });
      const profileImage = this.userForm.get('profileImage')?.value;
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
      if (
        formUser.role === 'trabajador' &&
        this.departamento.valid &&
        this.puesto.valid
      ) {
        formUser.departamento = this.departamento.value;
        formUser.puesto = this.puesto.value;
        formData.append('departamento', formUser.departamento);
        formData.append('puesto', formUser.puesto);
      }

      this.apiService.registerUser(formData).subscribe(
        (response: any) => {
          console.log('Usuario registrado con éxito', response);
          this.userForm.reset();
          this._general.navigateBy('/superAdmin/usuarios');
        },
        (error: any) => {
          console.error('Error al registrar el usuario', error);
        }
      );
    } else {
    }
  }

  
}
