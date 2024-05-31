import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { GeneralService } from 'src/app/general.service';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-paciente-new',
  templateUrl: './paciente-new.component.html',
  styleUrls: ['./paciente-new.component.scss'],
})
export class PacienteNewComponent {
  public isOnCamera: boolean = false;
  private trigger: Subject<void> = new Subject<void>();

  public credencialSrc!: string;

  public pacienteForm = this.formBuilder.group({
    nombre_completo: ['', Validators.required],
    fotografia:  ["", Validators.required], 
  });

  constructor(
    private formBuilder: FormBuilder,
    private apiSevice: ApiService,
    private _general: GeneralService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}
  public onCamera() {
    this.isOnCamera = !this.isOnCamera;
    if (this.isOnCamera) {
      this.clearCameraView();
    }
    console.log('this.credencialSrc:', this.credencialSrc);
  }
  public triggerSnapshot(): void {
    console.log('triggerSnapshot');
    if (this.isOnCamera) {
      this.trigger.next();
    }
  }

  public volverTomarFoto(): void {
    this.isOnCamera = true;
    this.clearCameraView()
    
  }

  public capturarFoto(): void {
    this.triggerSnapshot();
  }

  private clearCameraView() {
    const cameraView = document.getElementById('camera-view');
    if (cameraView) {
      const imgElements = cameraView.querySelectorAll('img');
      imgElements.forEach((img) => {
        img.remove();
      });
    }
  }

  public handleImage(event: WebcamImage | Event): void {
    if (event instanceof WebcamImage) {
      this.credencialSrc = event.imageAsDataUrl;
      console.log('this.credencialSrc:', this.credencialSrc);
      const imgElement = document.createElement('img');
      imgElement.src = event.imageAsDataUrl;
      imgElement.classList.add('img-tomada');
      this.pacienteForm.controls.fotografia.setValue(this.credencialSrc)
      const cameraView = document.getElementById('camera-view');
      if (cameraView) {
        cameraView.innerHTML = '';
        cameraView.appendChild(imgElement);
      }

      this.isOnCamera = !this.isOnCamera;
    } else {
      console.error('Evento recibido no es una imagen de webcam', event);
    }
  }

  public get triggerObservable(): any {
      return this.trigger.asObservable();
  }

  ngOnInit(): void {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 500);
  }

  public onSubmit() {
    if (this.pacienteForm.invalid) {
      this.pacienteForm.markAllAsTouched()
      return;
    }

    const item = {
      nombre_completo: this.pacienteForm.get('nombre_completo')?.value,
      fotografia: this.pacienteForm.get('fotografia')?.value,
      historia_clinica_id: '',
    };

    this.apiSevice.createPacienteAndHistoriaClinica(item).subscribe(
      (response: any) => {
        console.log('Usuario registrado con éxito', response);
        this.pacienteForm.reset();
        this._general.navigateBy(
          `/trabajador/consultas/nuevo?patientCreated=true&nombre=${item.nombre_completo}&historia_id=${response.item.historia_clinica_id}&fotografia=${item.fotografia}`
        );
      },
      (error: any) => {
        console.error('Error al registrar el usuario', error);
      }
    );
  }
}
