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
  @ViewChild('signature', { static: true }) signature!: NgxSignaturePadComponent;
  
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
      let firmaBase64;

      let requestBody: any = {
        expediente: formPerfil.expediente,
        cedula_profesional: formPerfil.cedula_profesional,
        universidad: formPerfil.universidad,
        especialidad: formPerfil.especialidad,
        id_user: this.user_id,
        firma: ''
      };
      console.log("this.firmaImagen:", this.firmaImagen)
      if (this.firmaImagen) {
        console.log("estas enviando una firma")
      
         firmaBase64 = await this.imageToBase64(this.firmaImagen);
         console.log("firmaBase64:", firmaBase64)
         requestBody.firma = firmaBase64;
      }

      
    
      this._perfil_maestro.post_perfil(requestBody).subscribe(
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
