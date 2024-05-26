import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { GeneralService } from 'src/app/general.service';
import { EvidenciaModalService } from 'src/app/services/evidencia-modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.scss']
})

export class TratamientosComponent {
  public historia_clinica_id!:string;
  public diagnostico_id!:string;
  public alumno_id!:string;
  public evidencias: any = [];

  public tratamientoForm = this.formBuilder.group({
    tratamiento: new FormControl('', [Validators.required]),
    alumno: new FormControl(''),
    matricula: new FormControl('', [Validators.required]),
    expediente: new FormControl('', [Validators.required]),
    fecha_tratamiento: new FormControl('', [Validators.required]),
    observaciones: new FormControl('', [Validators.required]),
    motivo_rechazo: new FormControl('')
  });
  public async onSubmit() {
    const result = await Swal.fire({
      title: '¿Estás seguro de crear? Una vez creado, NO podra ser editado.',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      icon: 'question',
    });
    if (result.isConfirmed) {
      try {
        if(!this.tratamientoForm.controls.tratamiento.value){
          Swal.fire(
            'Oops...',
            'El campo tratamiento es obligatorio...',
            'error'
          )
          return;
        }
        if(!this.tratamientoForm.controls.matricula.value){
          Swal.fire(
            'Oops...',
            'El campo matricula es obligatorio...',
            'error'
          )
          return;
        }
        if(!this.tratamientoForm.controls.expediente.value){
          Swal.fire(
            'Oops...',
            'El campo expediente es obligatorio...',
            'error'
          )
          return;
        }
        if(!this.tratamientoForm.controls.fecha_tratamiento.value){
          Swal.fire(
            'Oops...',
            'El campo Fecha de tratamiento es obligatorio...',
            'error'
          )
          return;
        }
        if(!this.tratamientoForm.controls.observaciones.value){
          Swal.fire(
            'Oops...',
            'El campo Observaciones es obligatorio...',
            'error'
          )
          return;
        }
        
        const item = {
          ...this.tratamientoForm.value,
          historia_clinica_id: this.historia_clinica_id,
          diagnostico_id: this.diagnostico_id,
          maestro_id: "",
          alumno_id: this.alumno_id,
          motivo_rechazo: '',
          evidencias: this.evidencias
        };

        this.apiSevice.createTratamiento(item).subscribe(
          (response: any) => {
            console.log('Tratamiento creado con exito', response);
            this.tratamientoForm.reset();
            Swal.fire(
              'Tratamiento creado con exito',
              'En breve seras redirigido a la historia clinica del paciente',
              'success'
            );
            setTimeout(() => {
              this._general.navigateBy(
                `/estudiante/historia-clinica/edicion/${this.historia_clinica_id}`
              );
            }, 3000);
          },
          (error: any) => {
            console.error('Error al guardar la historia clinica', error);
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  }

  public item: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiSevice: ApiService,
    private _general: GeneralService,
    private route: ActivatedRoute,
    private evidenciaModal: EvidenciaModalService,
  ) {}

  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    if(user){
      this.tratamientoForm.controls.alumno.setValue(user.fullName);
      this.alumno_id = user.user_id;
    }
    this.route.params.subscribe((params: { [x: string]: any; }) => {
      this.historia_clinica_id = params['historia_clinica_id'];
      this.diagnostico_id = params['diagnostico_id'];

      this.apiSevice
        .getHistoriaClinica(this.historia_clinica_id)
        .subscribe((res: any) => {
          this.item = res.item;
        });
    });
  }
  

  public fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file as Base64'));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async onFileSelected(event: any) {
    const listaDeFiles = event.target.files;
    for await(const file of listaDeFiles) {
      if (!file.type.startsWith('image/')) {
        Swal.fire('Oops...', 'Solo se admiten imagenes como evidencias', 'warning');
        return;
      }
      const base64 = await this.fileToBase64(file)

      const evidencia = {
        title: "",
        description: "",
        image: base64
      }
      this.evidencias.push(evidencia)
    }
  
  }

  openRellenarEvidencialModal(evidencia:any, index: number){

    this.evidenciaModal.evidencia$.subscribe(respuesta => {
      console.log('Evidencia recibida en el componente que genera el Swal:', respuesta);
      this.evidencias[respuesta.id] = respuesta.evidencia
    });

    const domHTML = this.evidenciaModal.createHTMLModal(evidencia, index)


    Swal.fire({
      title: '',
      text: '',
      html: domHTML,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      showConfirmButton: false,
      width: '550px',
      padding: '0',
      allowOutsideClick: false,
      customClass: {
        popup: 'custom-swal-modal'
      },
      
    });
  }
 

}
