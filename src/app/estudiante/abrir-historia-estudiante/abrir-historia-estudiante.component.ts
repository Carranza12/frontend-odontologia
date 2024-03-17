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

  nombre_completo: FormControl = new FormControl('');
  telefono: FormControl = new FormControl('');
  nombre_contacto_emergencia: FormControl = new FormControl('');
  telefono_contacto_emergencia: FormControl = new FormControl('');

  public searchPatientsResultsMesagges: string = '';

  public patientsResults:any = [];

  public modalIsOpen:boolean = false;

  constructor(public patientService: PacienteService, public router: Router) {}

  ngOnInit(): void {}

  openModal() {
    const modal:any = document.getElementById('myModal');
    modal.style.display = 'block';
    this.modalIsOpen = true;
  }

  openHistorialClinico(historia_clinica_id:string){
    this.router.navigateByUrl('/estudiante/historia-clinica/edicion/'+ historia_clinica_id)
  }


  closeModal() {
    const modal:any = document.getElementById('myModal');
    modal.style.display = 'none';
    this.modalIsOpen = false;
  }

  async searchPatients(){
    let query = '?';
    if(this.nombre_completo.value){
      if(query === '?'){
        query += `nombre_completo=${this.nombre_completo.value}`
      }else{
        query += `&nombre_completo=${this.nombre_completo.value}`
      }
     
    }
    if(this.telefono.value){
      if(query === '?'){
        query += `telefono=${this.telefono.value}`
      }else{
        query += `&telefono=${this.telefono.value}`
      }
    }
    if(this.nombre_contacto_emergencia.value){
       if(query === '?'){
        query += `nombre_contacto_emergencia=${this.nombre_contacto_emergencia.value}`
      }else{
        query += `&nombre_contacto_emergencia=${this.nombre_contacto_emergencia.value}`
      }
    }
    if(this.telefono_contacto_emergencia.value){
       if(query === '?'){
        query += `telefono_contacto_emergencia=${this.telefono_contacto_emergencia.value}`
      }else{
        query += `&telefono_contacto_emergencia=${this.telefono_contacto_emergencia.value}`
      }
    }

    this.patientService.searchPatients(query).subscribe((value:any) => {
      this.patientsResults = value;
      if(this.patientsResults.length === 0){
        this.searchPatientsResultsMesagges = "No se encontraron resultados."
      }
    })
  }

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
