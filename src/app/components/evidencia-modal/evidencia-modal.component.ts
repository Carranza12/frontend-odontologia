import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EvidenciaModalService } from 'src/app/services/evidencia-modal.service';

@Component({
  selector: 'app-evidencia-modal',
  templateUrl: './evidencia-modal.component.html',
  styleUrls: ['./evidencia-modal.component.scss']
})
export class EvidenciaModalComponent implements OnInit{
  public evidenciaForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });
  @Input() evidencia!: any;
  @Input() index!: number;
  buttonText = "Guardar evidencia"
  image = "Guardar evidencia"
  constructor(
    private formBuilder: FormBuilder,
    private evidenciaModal: EvidenciaModalService
  ){}

  ngOnInit(): void {
    this.image = this.evidencia.image
    if(this.evidencia.title){
      this.evidenciaForm.controls.title.setValue(this.evidencia.title)
    }
    if(this.evidencia.description){
      this.evidenciaForm.controls.description.setValue(this.evidencia.description)
    }
    
    console.log("input:", this.image)
    console.log("index:", this.index)
  }

  onSubmit(){
    const evidencia = {
      title: this.evidenciaForm.controls.title.value,
      description: this.evidenciaForm.controls.description.value,
      image: this.image
    }
    this.evidenciaModal.enviarEvidencia({
      evidencia,
      id: this.index
    });
    this.buttonText = "Evidencia enviada"

  }
}
