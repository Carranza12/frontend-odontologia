import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/empleado/services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abrir-historia-estudiante',
  templateUrl: './abrir-historia-estudiante.component.html',
  styleUrls: ['./abrir-historia-estudiante.component.scss']
})
export class AbrirHistoriaEstudianteComponent {
  codigoControl: FormControl = new FormControl('', Validators.required);

  constructor(public patientService: PacienteService, public router: Router) {}

  ngOnInit(): void {}

  submit() {
    if (!this.codigoControl.value) {
      Swal.fire(
        'Oops...',
        'Por favor rellena el campo de codigo para abrir una historia clinica.',
        'error'
      );
      return;
    }

    this.patientService
      .getHistoriaClinicaByCodigo(this.codigoControl.value)
      .subscribe(async (data: any) => {
        if (data.item === null) {
          Swal.fire(
            data.message,
            'Por favor proporciona un codigo valido.',
            'error'
          );
          return;
        }
        if (data.item._id) {
          this.router.navigateByUrl(
            `/estudiante/historia-clinica/edicion/${data.item._id}`
          );
        }
      });
  }
}
