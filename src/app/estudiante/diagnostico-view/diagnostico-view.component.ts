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

  public motivo_rechazo = new FormControl('');
  public isRechazado: boolean = false;

  public usuarioLogeado:any;
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
    this.usuarioLogeado = user;
    this.route.params.subscribe((params) => {
      const diagnostico_id = params['id'];
      this.apiSevice
        .getDiagnostico(diagnostico_id)
        .subscribe((res: any) => {
          this.diagnosticoItem = res.item;
          let idParaAPi = this.diagnosticoItem.tratamiento_id;
          if(this.diagnosticoItem.tratamiento_id){
            this.haveTratamiento = true;
      
            this.route.queryParams.subscribe(queryParams => {
              const tratamiento = queryParams['tratamiento'];
              if (tratamiento) {
               idParaAPi = tratamiento;
              } 
            });
            console.log("idParaAPi:", idParaAPi)
            this.apiSevice.getTratamiento(idParaAPi).subscribe((tratamientoRes:any) => {
              this.tratamientoItem = tratamientoRes.item;
              console.log(" this.tratamientoItem:",  this.tratamientoItem)
              if(this.tratamientoItem.maestro_id === 'RECHAZADO' && this.tratamientoItem.motivo_rechazo){
                this.isRechazado = true;
              }
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

  public nuevoTratamiento(){
    this._router.navigateByUrl(`estudiante/tratamientos/${this.diagnosticoItem.historia_clinica_id}/${this.diagnosticoItem._id}`)
  }


  public async aprobarTratamiento() {
    const result = await Swal.fire({
      title: `Yo, ${this.usuarioLogeado.fullName} Apruebo este tratamiento para que se realize.`,
      showCancelButton: true,
      confirmButtonText: 'Estoy seguro de aprobarlo',
      cancelButtonText: 'Cancelar',
      icon: 'question'
    });

    if (result.isConfirmed) {
      try {
        const tratamiento = {
          ... this.tratamientoItem,
          maestro_id: this.usuarioLogeado.user_id
        }
        this.apiSevice.updateTratamiento(this.tratamientoItem._id, tratamiento).subscribe((res:any) => {
          console.log("REALIZADO CON EXITO")
          this._router.navigateByUrl(`/estudiante/historia-clinica/edicion/${this.tratamientoItem.historia_clinica_id}`)
        })
      } catch (error) {
        console.error(error);
      }
    }
  }

  public async rechazarTratamiento() {
    const result = await Swal.fire({
      title: `Yo, ${this.usuarioLogeado.fullName} Rechazo este tratamiento para que NO se realize.`,
      showCancelButton: true,
      confirmButtonText: 'Estoy seguro de rechazarlo.',
      cancelButtonText: 'Cancelar',
      icon: 'question'
    });

    if (result.isConfirmed) {
      try {
        if(!this.motivo_rechazo.value){
          Swal.fire(
            'Oops...',
            'Por favor rellena el motivo del rechazo del tratamiento',
            'error'
          )
          return;
        }
        const tratamiento = {
          ... this.tratamientoItem,
          maestro_id: "RECHAZADO",
          motivo_rechazo: this.motivo_rechazo.value
        }
        this.apiSevice.updateTratamiento(this.tratamientoItem._id, tratamiento).subscribe((res:any) => {
          console.log("REALIZADO CON EXITO")
          this._router.navigateByUrl(`/estudiante/historia-clinica/edicion/${this.tratamientoItem.historia_clinica_id}`)
        })
      } catch (error) {
        console.error(error);
      }
    }
  }
}
