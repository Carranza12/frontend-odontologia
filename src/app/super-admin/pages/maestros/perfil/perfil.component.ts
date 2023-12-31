import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxSignatureOptions,
  NgxSignaturePadComponent,
} from '@eve-sama/ngx-signature-pad';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PerfilMaestroService } from 'src/app/empleado/services/perfil_maestros.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  @ViewChild('signature') signature!: NgxSignaturePadComponent;
  public firmaImagen: any = null;
  public firmaImagenShow: string | null = null;
  public showEditFirma: boolean = false;
  public isEditPerfil: boolean = false;
  public user_id!: string;
  public perfilForm = this.formBuilder.group({
    expediente: ['', Validators.required],
    cedula_profesional: ['', Validators.required],
    universidad: ['', Validators.required],
    especialidad: ['', Validators.required],
  });
  public width_firma = '500px';
  public options: any = {
    backgroundColor: '#F4F5F5',
    css: {
      'border-radius': '16px',
      'width': this.width_firma
    },
    
  };
  constructor(
    public _general: GeneralService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private _perfil_maestro: PerfilMaestroService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.user_id = id;
      this._perfil_maestro.getPerfil(id).subscribe(
        (data: any) => {
          if (data) {
            this.isEditPerfil = true;
            this.perfilForm.get('expediente')?.setValue(data.expediente);
            this.perfilForm
              .get('cedula_profesional')
              ?.setValue(data.cedula_profesional);
            this.perfilForm.get('universidad')?.setValue(data.universidad);
            this.perfilForm.get('especialidad')?.setValue(data.especialidad);
            this.firmaImagenShow = data.firma;
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
    });

  this.adjustWidthBasedOnScreenWidth()
    

  }

  private adjustWidthBasedOnScreenWidth() {
    const screenWidth =  document.documentElement.clientWidth;
    console.log("screenWidth:", screenWidth)
    if (screenWidth <= 537 && screenWidth > 440) {
      console.log("aqui 1")
      this.options.css.width = '400px';
    } 
    if (screenWidth <= 440  && screenWidth > 400) {
      console.log("aqui 2")
      this.options.css.width = '360px';
    }
    if (screenWidth <= 400) {
      console.log("aqui 3")
      this.options.css.width = '330px';
    } 
    
  }

  async onSubmit() {
    if (this.perfilForm.valid) {
      let formPerfil: any = this.perfilForm.value;

      const formData: any = new FormData();

      // Convierte la firma a Blob
      if (this.firmaImagen) {
        const blob = await this.dataURLtoBlob(this.firmaImagen);
        const file = new File([blob], 'firma.jpg', { type: 'image/jpeg' });

        formData.append('firma', file);
      }

      formData.append('expediente', formPerfil.expediente);
      formData.append('cedula_profesional', formPerfil.cedula_profesional);
      formData.append('universidad', formPerfil.universidad);
      formData.append('especialidad', formPerfil.especialidad);
      formData.append('id_user', this.user_id);

      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      this._perfil_maestro.post_perfil(formData).subscribe(
        (response: any) => {
          // Manejar la respuesta exitosa aquí
          console.log('Solicitud exitosa:', response);
          this.router.navigateByUrl("/superAdmin/maestros")
        },
        (error: any) => {
          // Manejar errores aquí
          console.error('Error en la solicitud:', error);
        }
      );
    }
  }

  onBeginSign(): void {
    console.log('on begin sing');
  }

  onEndSign(): void {
    if (this.signature) {
      this.firmaImagen = this.signature.toDataURL();
    }
  }

  async dataURLtoBlob(dataURL: string): Promise<Blob> {
    return new Promise((resolve) => {
      const byteString = atob(dataURL.split(',')[1]);
      const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      resolve(blob);
    });
  }
}
