import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-consulta-new',
  templateUrl: './consulta-new.component.html',
  styleUrls: ['./consulta-new.component.scss']
})
export class ConsultaNewComponent implements OnInit{
  public nombre_paciente_autocomplete: FormControl = new FormControl('');
  public list_pacientes:any = [];
  public showAutocomplete:boolean = true;
  public showPatientDetail:boolean = false;
  public patient :any = {}
  public userData:any = {}

  public myAngularxQrCode!: string ;
  
  constructor(private _paciente:PacienteService){
    this.myAngularxQrCode = 'Your QR code data string';
  }

  ngOnInit(): void {
    const user_json = localStorage.getItem('user');
    if (user_json) {
      this.userData = JSON.parse(user_json);
    }

    this.nombre_paciente_autocomplete.valueChanges.subscribe((nombre) => {
      this.list_pacientes = this._paciente.getEmpleados();
      this.list_pacientes = this.list_pacientes.filter((paciente:any) => paciente.nombre_completo.toLowerCase().includes(nombre))
    })
  }

  public selectPatient(patient:any){
    this.showAutocomplete = false
    this.showPatientDetail = true;
    this.patient.nombre_completo = patient.nombre_completo;
    this.patient.fecha_consulta = new Date()
    this.patient.consulta_generada = this.userData.fullName
    this.myAngularxQrCode = `http://localhost:4200/historia-clinica/edicion/${patient.historia_clinica_id}`

  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`CONSULTA_${this.patient.nombre_completo}_${this.patient.fecha_consulta}.pdf`);
    });
  }


}
