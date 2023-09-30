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

  
  
  onSubmit() {
    if (this.userForm.valid) {
      let formData: any = this.userForm.value;

      if(formData.role === "trabajador" && this.departamento.valid && this.puesto.valid){
        formData.departamento = this.departamento.value;
        formData.puesto = this.puesto.value
      }

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
