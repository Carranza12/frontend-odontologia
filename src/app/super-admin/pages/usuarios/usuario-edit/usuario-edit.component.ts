import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss'],
})
export class UsuarioEditComponent {
  public userForm = this.formBuilder.group({
    name: ['', Validators.required],
    last_name: ['', Validators.required],
    password: [''],
    role_default: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    changePass: [false],
    profileImage: [''],
  });
  public img_path!: string;
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

  public idParam!: string;

  constructor(
    public _general: GeneralService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userForm.get('role')?.valueChanges.subscribe((valor) => {
      if (valor === 'trabajador') {
        this.showTrabajadorInputs = true;
      }
      if (valor === 'superAdmin') {
        this.showTrabajadorInputs = false;
      }
    });
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.idParam = id;
      this.apiService.getUser(id).subscribe(
        (data: any) => {
          if (data) {
            this.completeInput(data);
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
    });
   
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.userForm?.get('profileImage')?.setValue(file);
  }

  public completeInput(user: any) {
    user.roles.forEach((role: any) => {
      const newRole = {
        value: role,
        text: role,
        selected: true,
      };
      this.rolesSelectedList.push(newRole);
      const findIndexInRolesAvailable = this.rolesAvailableList.findIndex(
        (item: any) => item.value === role
      );
      if (findIndexInRolesAvailable !== -1) {
        this.rolesAvailableList[findIndexInRolesAvailable].selected = true;
      }

      if (role === 'trabajador') {
        this.departamento.setValue(user.departamento);
        this.puesto.setValue(user.puesto);
      }
    });

    this.rolesAvailableList.forEach((item: any) => {
      if (item.value === 'trabajador' && item.selected) {
        this.showTrabajadorInputs = true;
      }
      if (item.value === 'trabajador' && !item.selected) {
        this.showTrabajadorInputs = false;
      }
    });

    this.userForm.get('name')?.setValue(user.name);
    this.userForm.get('last_name')?.setValue(user.last_name);
    this.userForm.get('role_default')?.setValue(user.role_default);
    this.userForm.get('email')?.setValue(user.email);
    this.img_path = "http://"+ user.profileImage;
    

    
  }

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

  onSubmit() {
    console.log(this.userForm.value)
    if (this.userForm.valid) {
      let formUser: any = this.userForm.value;
      const formData = new FormData();
      formData.append('name', formUser.name);
      formData.append('last_name', formUser.last_name);
      if(this.userForm.get("changePass")){
        formData.append('password', formUser.password);
      }
      formData.append('role_default', formUser.role_default);
      formData.append('email', formUser.email);
      this.rolesSelectedList.forEach((item: any) => {
        formData.append('roles', item.value);
      });
      const profileImage = this.userForm.get('profileImage')?.value;
      console.log('profileImage:', profileImage);
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
      console.log("formData:", formData)
      this.apiService.EditUser(formData, this.idParam).subscribe(
        (response: any) => {
          console.log('Usuario actualizado con éxito', response);
          this.userForm.reset();
          this._general.navigateBy('/superAdmin/usuarios');
        },
        (error: any) => {
          console.error('Error al actualizar el usuario', error);
        }
      );
    } else {
    }
  }
}
