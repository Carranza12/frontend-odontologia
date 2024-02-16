import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { asignaturaService } from 'src/app/asignatura.service';
import { PerfilEstudiantesService } from 'src/app/empleado/services/perfil_estudiantes.service';
import { GeneralService } from 'src/app/general.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.scss']
})
export class DiagnosticoComponent implements OnInit{
    @ViewChild('canvas') canvas: any;
    ctx: any;
    isDrawing: boolean = false;

    canvasWidth: number = 800;
    canvasHeight: number = 600;

    public evidencia1: FormControl = new FormControl('');
    public evidencia2: FormControl = new FormControl('');
    public evidencia3: FormControl = new FormControl('');
    public evidencia4: FormControl = new FormControl('');
    public evidencia5: FormControl = new FormControl('');
  
    public showConsultasInfoTab: boolean = false;
    public showOdontogramaInfoTab: boolean = true;
  
    public diagnosticoForm = this.formBuilder.group({
      });
  
    public motivos_de_la_consulta = new FormControl('');
    public fecha_de_la_consulta = new FormControl('');
    public comentarios_sobre_la_consulta = new FormControl('');
    public practica_para_la_materia = new FormControl('');
    public materia_Seleccionada_consula:any = {}
  
 
    public estudianteData:any = {}
  
    public isAprobadoAnyConsulta:boolean = false;
  
    public consultasList:any = []
  
    public historia_clinica_id:any = ''
    constructor(
      private formBuilder: FormBuilder,
      private apiSevice: ApiService,
      private _general: GeneralService,
      private _route: ActivatedRoute,
      private _perfil_estudiante: PerfilEstudiantesService,
      private _asignaturas:asignaturaService
    ) {}
  
    ngOnInit(): void {
      let user:any = localStorage.getItem("user")
      user = JSON.parse(user)
  
     /*  this.practica_para_la_materia.valueChanges.subscribe((value) => {
        this.materia_Seleccionada_consula = this.estudianteData.materias.find((item:any ) => item.value === value)
      })
      
      this._perfil_estudiante.getPerfil(user.user_id).subscribe(async (data:any) => {
        let materias :any = []
        for await(const item_materia of data.materias){
          this._asignaturas.get(item_materia.materia_id).subscribe((materia_data:any) => {
            materias.push({
              text: materia_data.nombre,
              value: materia_data._id
            })
          })
        }
        this.estudianteData = {
          matricula: data.Matricula,
          carrera: data.carrera,
          materias: materias,
          semestre_Actual: data.semestre_actual,
          id_estudiante: data._id
        }
  
      
      })
     
      this._route.params.subscribe((param) => {
  
  
  
  
        this.historia_clinica_id = param['id']
        if(this.historia_clinica_id){
          this.apiSevice.getHistoriaClinica(this.historia_clinica_id).subscribe(
            (response: any) => {
             console.log("RESPONSE:", response.item)
             const consultas = response.item.historia_clinica.consultas;
             for(const consulta of consultas){
              if(consulta.aprobado === 'Aprobado'){
                this.isAprobadoAnyConsulta = true;
              }
             } 
             this.consultasList = response.item.historia_clinica.consultas
             this.consultasList = this.consultasList.map((item:any) => ({...item, selected: true}))
            },
            (error: any) => {
              console.error('Error al registrar el usuario', error);
            }
          );
        }
      }) */
  
    }

  
    ngAfterViewInit(): void {
      this.ctx = this.canvas.nativeElement.getContext('2d');
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'black';
      const backgroundImage = new Image();
      backgroundImage.src = '../../../assets/logos/odontograma.jpg';
      backgroundImage.onload = () => {
        this.ctx.drawImage(backgroundImage, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      };
    }
  
    startDrawing(event: MouseEvent): void {
      this.isDrawing = true;
      this.ctx.beginPath();
      this.ctx.moveTo(event.offsetX, event.offsetY);
    }
  
    draw(event: MouseEvent): void {
      if (this.isDrawing) {
        this.ctx.lineTo(event.offsetX, event.offsetY);
        this.ctx.stroke();
      }
    }
  
    endDrawing(): void {
      this.isDrawing = false;
    }
  
  
    public viewEvidencia(url:string){
      window.open(url,"_blank")
    }
  
    public onSubmit() {
     
  
      const item = {
       ...this.diagnosticoForm.value,
        consultas : this.consultasList,
        odontogramas: [],
        paciente: {
          nombre_completo: this.diagnosticoForm.get("nombre_completo")?.value,
          fecha_de_nacimiento : this.diagnosticoForm.get("fecha_de_nacimiento")?.value,
          genero: this.diagnosticoForm.get("genero")?.value,
          estado_civil: this.diagnosticoForm.get("estado_civil")?.value,
          ocupacion: this.diagnosticoForm.get("ocupacion")?.value,
          domicilio: this.diagnosticoForm.get("domicilio")?.value,
          telefono: this.diagnosticoForm.get("telefono")?.value,
          ciudad_origen: this.diagnosticoForm.get("ciudad_origen")?.value,
          estado_origen: this.diagnosticoForm.get("estado_origen")?.value,
          pais_origen: this.diagnosticoForm.get("pais_origen")?.value,
          ciudad_Actual : this.diagnosticoForm.get("ciudad_Actual")?.value,
          nombre_contacto_emergencia: this.diagnosticoForm.get("nombre_contacto_emergencia")?.value,
          parentesco_contacto_emergencia: this.diagnosticoForm.get("parentesco_contacto_emergencia")?.value,
          telefono_contacto_emergencia: this.diagnosticoForm.get("telefono_contacto_emergencia")?.value,
  
  
        }
      };
  
      this.apiSevice.updateHistoriaClinica(this.historia_clinica_id, item).subscribe(
        (response: any) => {
          console.log('historia clinica guardada con exito', response);
  
          this.consultasList.forEach((consulta:any) => {
            console.log("cosnulta:", consulta)
            const materia_id = consulta.practica_para_la_materia.value;
            this._perfil_estudiante.getPerfil(consulta.estudiante.id_estudiante).subscribe((estudianteData:any) => {
   
              let materias = estudianteData.materias;
              let find_index_materia_to_update = materias.findIndex((materia:any) => materia.materia_id === materia_id )
              let find_materia_to_update = materias.find((materia:any) => materia.materia_id === materia_id )
          
              materias[find_index_materia_to_update] = {
                materia_id : find_materia_to_update.materia_id,
                practicas_realizadas : consulta.selected ? find_materia_to_update.practicas_realizadas : find_materia_to_update.practicas_realizadas + 1
              }
              const item_to_update = {
                ...estudianteData,
                materias
              }
              this._perfil_estudiante.update_perfil(consulta.estudiante.id_estudiante, item_to_update).subscribe((data_Res:any) => {
                console.log("compleado con exito", data_Res)
              })
            })
          })
          this.diagnosticoForm.reset();
          Swal.fire(
            'Historia clinica actualizada con exito',
            'En breve seras redirigido a tu tablero digital...',
            'success'
          )
          setTimeout(() => {
            this._general.navigateBy('/estudiante');
          }, 3000);
        },
        (error: any) => {
          console.error('Error al guardar la historia clinica', error);
        }
      );
    }
  
    public async saveConsulta(){
      let user:any = localStorage.getItem("user")
      user = JSON.parse(user)
  
      if(!this.fecha_de_la_consulta.value || !this.motivos_de_la_consulta.value || !this.comentarios_sobre_la_consulta.value || !this.practica_para_la_materia.value){
        Swal.fire(
          'Oops...',
          'Por favor rellena los campos vacios para crear una consulta.',
          'error'
        )
        return;
      }
     
    
      
      
     
      const consulta = {
        fecha_consulta: this.fecha_de_la_consulta.value,
        motivos_consulta: this.motivos_de_la_consulta.value,
        comentarios: this.comentarios_sobre_la_consulta.value,
        estudiante: {
         ...this.estudianteData,
         nombre: user.fullName
        },
        practica_para_la_materia: this.materia_Seleccionada_consula,
        aprobado: "Sin aprobar",
        maestro: { maestro_id: "", nombre: ""},
        selected : false,
        evidencia1: this.evidencia1.value,
        evidencia2: this.evidencia2.value,
        evidencia3: this.evidencia3.value,
        evidencia4: this.evidencia4.value,
        evidencia5: this.evidencia5.value,
      }
     this.consultasList.push(consulta)
     this.fecha_de_la_consulta.setValue("")
     this.motivos_de_la_consulta.setValue("")
     this.comentarios_sobre_la_consulta.setValue("")
     this.practica_para_la_materia.setValue("")
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
  
    async onFileSelected(event: Event, type:String) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        if(type === "evidencia1")  this.evidencia1.setValue(await this.fileToBase64(input.files[0]))
        if(type === "evidencia2")  this.evidencia2.setValue(await this.fileToBase64(input.files[0]))
        if(type === "evidencia3")  this.evidencia3.setValue(await this.fileToBase64(input.files[0]))
        if(type === "evidencia4")  this.evidencia4.setValue(await this.fileToBase64(input.files[0]))
        if(type === "evidencia5")  this.evidencia5.setValue(await this.fileToBase64(input.files[0]))
      }
    }
  
    public otroCheckbox() {
    
    
    }
 
  
    public nextPaso6(){
      this.showConsultasInfoTab = true;
      this.showOdontogramaInfoTab = false;
    }

    public changeTab(tabName: string) {
     
      if (tabName === 'consultas_del_paciente') {
        this.showConsultasInfoTab = true;
        this.showOdontogramaInfoTab = false;
      }

      if (tabName === 'odontograma') {
        this.showConsultasInfoTab = false;
        this.showOdontogramaInfoTab = true;
      }
    }
  }  

