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
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    changePass: [false]
  });
  public img_path! :string;
  public departamento: FormControl = new FormControl('', Validators.required);
  public puesto: FormControl = new FormControl('', Validators.required);
  public showTrabajadorInputs: boolean = false;
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
      this.apiService.getUser(id).subscribe(
        (data:any) => {
          if(data){
            this.completeInput(data);
          }
        },
        (error:any) => {
          console.error(error);
        }
      );
    });
    this.userForm.get("changePass")?.valueChanges.subscribe((valor:any)=>{
      console.log(valor)
      if(valor){
        this.userForm.get("password")?.enable();
        
      }
      else{
        this.userForm.get("password")?.disable();
        this.userForm.get("password")?.setValue("");
      }
    })
  }

  public completeInput(user:any){
    console.log("user:", user)
    this.userForm.get("name")?.setValue(user.name);
    this.userForm.get("last_name")?.setValue(user.last_name);
    this.userForm.get("role")?.setValue(user.role);
    this.userForm.get("email")?.setValue(user.email);
    this.img_path = "http://localhost:3000/" + user.profileImage;
    this.userForm.get("password")?.disable();
    if(user.role === "trabajador"){
      this.departamento.setValue(user.departamento)
      this.puesto.setValue(user.puesto)
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      let formData: any = this.userForm.value;

      if (
        formData.role === 'trabajador' &&
        this.departamento.valid &&
        this.puesto.valid
      ) {
        formData.departamento = this.departamento.value;
        formData.puesto = this.puesto.value;
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
