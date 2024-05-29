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
import { LoadingService } from 'src/app/services/loading.service';
import Swal from 'sweetalert2';
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

  
  public options: any = {
    backgroundColor: '#F4F5F5',
    minWidth: 1,
    
    css: {
      'border': '1px dashed #000',
      'width': '500px',
      'margin-bottom': '20px',
    },
  };
  

  constructor(
    public _general: GeneralService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private _perfil_maestro: PerfilMaestroService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 500);

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
            console.log("this.firmaImagenShow:", this.firmaImagenShow)
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
    if (screenWidth <= 537 && screenWidth > 440) {
      this.options.css.width = '400px';
    } 
    if (screenWidth <= 440  && screenWidth > 400) {
      this.options.css.width = '360px';
    }
    if (screenWidth <= 400) {
      this.options.css.width = '330px';
    } 
    
  }

  async onSubmit() {
    this.loadingService.show()
    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched()
      this.loadingService.hide()
      return;
    }
    if (this.perfilForm.valid) {
      let formPerfil: any = this.perfilForm.value;
      let firmaBase64;

      let requestBody: any = {
        expediente: formPerfil.expediente,
        cedula_profesional: formPerfil.cedula_profesional,
        universidad: formPerfil.universidad,
        especialidad: formPerfil.especialidad,
        id_user: this.user_id,
        firma: this.firmaImagenShow
      };
      if (this.firmaImagen) {
         firmaBase64 = await this.imageToBase64(this.firmaImagen);
         console.log("firmaBase64:", firmaBase64)
      }

      this._perfil_maestro.post_perfil(requestBody).subscribe(
        (response: any) => {
          Swal.fire('Perfil de maestro configurado exitosamente', '', 'success');
          this.loadingService.hide()
          this.router.navigateByUrl("/superAdmin/maestros")
        },
        (error: any) => {
          console.error('Error en la solicitud:', error);
          this.loadingService.hide()
        }
      );
    }
  }

  async imageToBase64(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const base64String = canvas.toDataURL('image/jpeg');
          resolve(base64String);
        } else {
          reject(new Error('Failed to get canvas context.'));
        }
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = imageUrl;
    });
  }

  onBeginSign(): void {
    console.log('on begin sing');
  }

  onEndSign(): void {
    console.log("this.signature:", this.signature)
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
