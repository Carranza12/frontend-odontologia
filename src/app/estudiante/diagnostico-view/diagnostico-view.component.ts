import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private formBuilder: FormBuilder,
    private apiSevice: ApiService,
    private _general: GeneralService,
    private route: ActivatedRoute
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
          console.log('DIAGNOSTICO ITEM:', this.diagnosticoItem);

          this.apiSevice
          .getHistoriaClinica(this.diagnosticoItem.historia_clinica_id)
          .subscribe((res: any) => {
            this.item = res.item;
            console.log('HISTORIA CLINICA ITEM:', this.item);
          });
        });

      
    });
  }

  public viewEvidencia(url: string) {
    window.open(url, '_blank');
  }

}
