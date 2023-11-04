import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSignaturePadComponent } from '@eve-sama/ngx-signature-pad';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PerfilEstudiantesService } from 'src/app/empleado/services/perfil_estudiantes.service';
import { PerfilMaestroService } from 'src/app/empleado/services/perfil_maestros.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-estudiante-perfil',
  templateUrl: './estudiante-perfil.component.html',
  styleUrls: ['./estudiante-perfil.component.scss']
})
export class EstudiantePerfilComponent {
  public user_id!: string;

  public perfilForm = this.formBuilder.group({
    Matricula: ['', Validators.required],
    semestre_actual: ['', Validators.required],
    universidad: ['', Validators.required],
    especialidad: ['', Validators.required],
  });



  constructor(
    public _general: GeneralService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private _perfil_estudiante: PerfilEstudiantesService,
    private route: ActivatedRoute
  ) {}

  public semestresList = [
    {
      value: '1',
      text: 'primer semestre',
    },
    {
      value: '2',
      text: 'segundo semestre',
    },
    {
      value: '3',
      text: 'tercer semestre',
    },
    {
      value: '4',
      text: 'cuarto semestre',
    },
    {
      value: '5',
      text: 'quinto semestre',
    },
    {
      value: '6',
      text: 'sexto semestre',
    },
    {
      value: '7',
      text: 'septimo semestre',
    },
    {
      value: '8',
      text: 'octavo semestre',
    },
    {
      value: '9',
      text: 'noveno semestre',
    },
  ];

  public materiasAvailableList:any = []
  public materiasSelectedList:any = []
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.user_id = id;
      this._perfil_estudiante.getPerfil(id).subscribe(
        (data: any) => {
          if (data) {
           
            this.perfilForm.get('Matricula')?.setValue(data.Matricula);
            this.perfilForm
              .get('semestre_actual')
              ?.setValue(data.semestre_actual);
            this.perfilForm.get('universidad')?.setValue(data.universidad);
            this.perfilForm.get('especialidad')?.setValue(data.especialidad);
          
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
    });

    this.perfilForm.get("semestre_actual")?.valueChanges.subscribe((valor) => {

      this._perfil_estudiante.getAsigntaturasBySemestre(valor).subscribe((data:any) => {
        
        this.materiasAvailableList = data
        console.log("MATERIAS:", this.materiasAvailableList)
        this.materiasAvailableList = this.materiasAvailableList.map((item:any) => ({
          ...item,
          selected: false,
        }))
      })
    })
    

  }

 

  async onSubmit() {
    if (this.perfilForm.valid) {
      let formPerfil: any = this.perfilForm.value;

      const formData: any = new FormData();

      // Convierte la firma a Blob
     

      formData.append('expediente', formPerfil.expediente);
      formData.append('cedula_profesional', formPerfil.cedula_profesional);
      formData.append('universidad', formPerfil.universidad);
      formData.append('especialidad', formPerfil.especialidad);
      formData.append('id_user', this.user_id);

      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      this._perfil_estudiante.post_perfil(formData).subscribe(
        (response: any) => {
          // Manejar la respuesta exitosa aquí
          console.log('Solicitud exitosa:', response);
          this.router.navigateByUrl("/superAdmin/estudiantes")
        },
        (error: any) => {
          // Manejar errores aquí
          console.error('Error en la solicitud:', error);
        }
      );
    }
  }

  public selectmateria(materia:any){
    const indexMatch = this.materiasAvailableList.findIndex(
      (item: any) => item._id === materia._id
    );
    this.materiasAvailableList[indexMatch].selected =
      !this.materiasAvailableList[indexMatch].selected;
    if (this.materiasAvailableList[indexMatch].selected) {
      this.materiasSelectedList.push(this.materiasAvailableList[indexMatch]);
    }
    if (!this.materiasAvailableList[indexMatch].selected) {
      const indexDelete = this.materiasSelectedList.findIndex(
        (item: any) => item.value === this.materiasAvailableList[indexMatch].value
      );
      this.materiasSelectedList.splice(indexDelete, 1);
    }

    console.log("materiasSelectedList:", this.materiasSelectedList)

  }

  

  

  
}
