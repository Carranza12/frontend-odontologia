import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { asignaturaService } from 'src/app/asignatura.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PerfilEstudiantesService } from 'src/app/empleado/services/perfil_estudiantes.service';
import { PerfilMaestroService } from 'src/app/empleado/services/perfil_maestros.service';
import { GeneralService } from 'src/app/general.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environment';
@Component({
  selector: 'app-practicas-pendientes',
  templateUrl: './practicas_pendientes.component.html',
  styleUrls: ['./practicas_pendientes.component.scss'],
})
export class practicasPendientesComponent {
  public practicasParaRevisarList: any = [];
  public nombreMateria!: string;
  user!:any;
  constructor(
    public _general: GeneralService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public _asignaturas: asignaturaService,
    public _perfil_estudiante: PerfilEstudiantesService,
    public _perfil_maestro: PerfilMaestroService,
    public router: Router,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '')
    console.log("this.user:", this.user)
    this.route.params.subscribe(async (params: Params) => {
      const materia_id = params['materia_id'];
      const data = await this.apiService.getHistoriaClinicaByMateria(
        materia_id
      );
      data.subscribe((res: any) => {
        for (const historia of res) {
          const historia_id = historia._id;
          const consultas = historia.consultas;

          consultas.forEach((consulta: any, index: number) => {
            if (
              consulta.practica_para_la_materia.value === materia_id &&
              consulta.aprobado === 'Sin aprobar'
            ) {
              this.practicasParaRevisarList.push({
                ...consulta,
                historia_clinica_id: historia_id,
                indiceOriginal: index,
              });
            }
          });
        }
      });

      const materia = await this._asignaturas.get(materia_id);
      materia.subscribe((res: any) => {
        this.nombreMateria = res.nombre;
      });
    });
  }

  viewHistoria(historia_clinica_id:string){
    window.open(`${environment.frontenHost}/estudiante/historia-clinica/edicion/${historia_clinica_id}`,'_blank')
  }
  async aprobarPractica(practica: any) {
    const result = await Swal.fire({
      title: '¿Estás seguro de aprobar la practica?',
      text: 'Una vez que apruebes una practica, la historia clinica a la que pertenece ya NO podra ser editada',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      this.apiService
        .getHistoriaClinica(practica.historia_clinica_id)
        .subscribe((res: any) => {
          let historia_item = res?.item?.historia_clinica;
          const paciente = res?.item?.paciente;
          console.log('paciente:', paciente);
          if (historia_item) {
            if (historia_item.consultas) {
              const findConsultaToUpdateIndex =
                historia_item.consultas.findIndex(
                  (consulta: any, index: number) => index === practica.indiceOriginal
                );
              if (findConsultaToUpdateIndex !== -1) {
                historia_item.consultas[findConsultaToUpdateIndex] = {
                  ...historia_item.consultas[findConsultaToUpdateIndex],
                  aprobado: 'Aprobado',
                  maestro: {
                    maestro_id: this.user.user_id || '',
                    nombre: this.user.fullName || ''
                  }
                };
              }

              try {
                this.apiService
                  .updateHistoriaClinica(practica.historia_clinica_id, {
                    ...historia_item,
                    paciente: paciente,
                  })
                  .subscribe(
                    (response: any) => {
                      console.log('PRACTICA APROBADA CON EXITO', response);
                      Swal.fire('Practica aprobada con exito.', '', 'success');
                        location.reload()
                    },
                    (error: any) => {
                      console.error('Error', error);
                      Swal.fire(
                        `Ocurrio un error al hacer la solicitud: ${error}`,
                        '',
                        'error'
                      );
                    }
                  );
              } catch (error) {
                console.error(error);
              }
            }
          }
        });
    }
  }

  async rechazarPractica(practica: any) {
    const result = await Swal.fire({
      title: '¿Estás seguro de rechazar la practica?',
      text: 'Una vez que rechazes una practica, Esta no contara como realizada por el alumno, pero seguira apareciendo en el historial de practicas.',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      this.apiService
        .getHistoriaClinica(practica.historia_clinica_id)
        .subscribe((res: any) => {
          let historia_item = res?.item?.historia_clinica;
          const paciente = res?.item?.paciente;
          console.log('paciente:', paciente);
          if (historia_item) {
            if (historia_item.consultas) {
              const findConsultaToUpdateIndex =
                historia_item.consultas.findIndex(
                  (consulta: any, index: number) => index === practica.indiceOriginal
                );
              if (findConsultaToUpdateIndex !== -1) {
                historia_item.consultas[findConsultaToUpdateIndex] = {
                  ...historia_item.consultas[findConsultaToUpdateIndex],
                  aprobado: 'Rechazado',
                  maestro: {
                    maestro_id: this.user.user_id || '',
                    nombre: this.user.fullName || ''
                  }
                };
              }

              try {
                this.apiService
                  .updateHistoriaClinica(practica.historia_clinica_id, {
                    ...historia_item,
                    paciente: paciente,
                  })
                  .subscribe(
                    (response: any) => {
                      console.log('PRACTICA RECHAZADA CON EXITO', response);
                      Swal.fire('Practica rechazada con exito.', '', 'success');
                        location.reload()
                    },
                    (error: any) => {
                      console.error('Error', error);
                      Swal.fire(
                        `Ocurrio un error al hacer la solicitud: ${error}`,
                        '',
                        'error'
                      );
                    }
                  );
              } catch (error) {
                console.error(error);
              }
            }
          }
        });
    }
  }
}
