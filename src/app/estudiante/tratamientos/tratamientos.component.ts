import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { GeneralService } from 'src/app/general.service';
import { EvidenciaModalService } from 'src/app/services/evidencia-modal.service';
import { LoadingService } from 'src/app/services/loading.service';
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
    this.loadingService.show()
    const alumno = this.tratamientoForm.controls.alumno.value
    const matricula = this.tratamientoForm.controls.matricula.value
    const expediente = this.tratamientoForm.controls.expediente.value
    const fecha_tratamiento = this.tratamientoForm.controls.fecha_tratamiento.value
    const observaciones = this.tratamientoForm.controls.observaciones.value
    if(!alumno || !matricula || !expediente || !fecha_tratamiento || !observaciones){
      this.tratamientoForm.markAllAsTouched()
      this.loadingService.hide()
      return;
    }

    this.loadingService.hide()
    const result = await Swal.fire({
      title: '¿Estás seguro de crear? Una vez creado, NO podra ser editado.',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      icon: 'question',
    });
    if (result.isConfirmed) {
      try {
       
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
            this.loadingService.hide()
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
            this.loadingService.hide()
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
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 500);

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
      const compressedBase64 = await this.compressImage(file, 0.1);

      const evidencia = {
        title: "",
        description: "",
        image: compressedBase64
      }
      this.evidencias.push(evidencia)
    }
  
  }

  async compressImage(file: File, quality: number): Promise<string> {
    const image = await this.loadImage(URL.createObjectURL(file));
    const canvas = document.createElement('canvas');
    const ctx:any = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    const compressedBase64 = canvas.toDataURL('image/jpeg', quality); // Cambia 'jpeg' por 'png' si necesitas un formato diferente
    return compressedBase64;
  }

  async loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
  }

  async convertImageToBase64(file: File, maxWidth: number, maxHeight: number, quality: number): Promise<string> {
    const compressedBase64 = await this.compressImage(file, quality);
    const img = new Image();
    img.src = compressedBase64;
    const canvas = document.createElement('canvas');
    const ctx:any = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const resizedBase64 = canvas.toDataURL('image/jpeg', quality); // Cambia 'jpeg' por 'png' si necesitas un formato diferente
    return resizedBase64;
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
