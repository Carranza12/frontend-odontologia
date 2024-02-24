import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { asignaturaService } from 'src/app/asignatura.service';
import { PerfilEstudiantesService } from 'src/app/empleado/services/perfil_estudiantes.service';
import { GeneralService } from 'src/app/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-diagnostico-view',
  templateUrl: './diagnostico-view.component.html',
  styleUrls: ['./diagnostico-view.component.scss']
})
export class DiagnosticoViewComponent {
 
  

  public item: any;
  public diagnosticoItem:any;
  public haveTratamiento: boolean = false;
  public tratamientoItem!:any;
  constructor(
    private formBuilder: FormBuilder,
    private apiSevice: ApiService,
    private _general: GeneralService,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);

    this.route.params.subscribe((params) => {
      const diagnostico_id = params['id'];
      this.apiSevice
        .getDiagnostico(diagnostico_id)
        .subscribe((res: any) => {
          this.diagnosticoItem = res.item;
          if(this.diagnosticoItem.tratamiento_id){
            this.haveTratamiento = true;
            this.apiSevice.getTratamiento(this.diagnosticoItem.tratamiento_id).subscribe((tratamientoRes:any) => {
              this.tratamientoItem = tratamientoRes.item;
              console.log(" this.tratamientoItem:",  this.tratamientoItem)
            })
          }
          
          this.apiSevice
          .getHistoriaClinica(this.diagnosticoItem.historia_clinica_id)
          .subscribe((res: any) => {
            this.item = res.item;
          });
        });

        

      
    });
  }

  public viewEvidencia(url: string) {
    window.open(url, '_blank');
  }

  public openTratamientoForm(){
    this._router.navigateByUrl(`estudiante/tratamientos/${this.diagnosticoItem.historia_clinica_id}/${this.diagnosticoItem._id}`)
  }

}
