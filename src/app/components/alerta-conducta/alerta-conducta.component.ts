import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerta-conducta',
  templateUrl: './alerta-conducta.component.html',
  styleUrls: ['./alerta-conducta.component.scss'],
})
export class AlertaConductaComponent implements OnInit {
  @Input() conductas!: any;
  @Input() titleHeader!: string;
  conductasColores = [
    {
      textoVisible: false,
      name: 'conducta_cooperativo',
      color: 'green',
      icon: 'far fa-smile',
      title: 'Cooperativo',
      description: 'El paciente sigue las indicaciones del médico, cumple con el tratamiento prescrito y se comunica abierta y honestamente sobre sus síntomas y preocupaciones.'
    },
    {
      textoVisible: false,
      name: 'conducta_ansioso',
      color: '#ffcc00',
      icon: 'fas fa-user-alt-slash',
      title: 'Ansioso',
      description: 'El paciente muestra signos de preocupación excesiva sobre su salud, puede estar nervioso durante la consulta y a menudo busca garantías constantes sobre su diagnóstico y tratamiento.'
    },
    {
      name: 'conducta_reticente',
      color: 'orange',
      icon: 'fas fa-user-alt',
      title: 'Reticente',
      description: 'El paciente es reacio a proporcionar información completa sobre sus síntomas o historia médica, a menudo debido a la desconfianza o vergüenza.'
    },
    {
      textoVisible: false,
      name: 'conducta_desinformado',
      color: 'blue',
      icon: 'fas fa-question-circle',
      title: 'Desinformado',
      description: 'El paciente tiene una comprensión limitada de su condición médica y tratamiento, lo que puede llevar a malentendidos y falta de adherencia a las indicaciones médicas.'
    },
    {
      textoVisible: false,
      name: 'conducta_agresiva',
      color: 'red',
      icon: 'fas fa-exclamation-triangle',
      title: 'Agresivo',
      description: 'El paciente puede mostrar comportamientos hostiles o desafiantes hacia el personal médico, a menudo debido a frustraciones o malentendidos sobre su tratamiento o diagnóstico.'
    },
    {
      textoVisible: false,
      name: 'conducta_acosador',
      color: 'purple',
      icon: 'fas fa-bullhorn',
      title: 'Acosador',
      description: 'El paciente acosador muestra comportamientos inapropiados hacia el personal médico, como comentarios personales, insinuaciones sexuales, contacto físico no deseado o comunicaciones repetidas y no solicitadas. Este comportamiento crea un entorno incómodo y hostil, afectando la relación médico-paciente y la calidad de la atención.'
    },
  ];
  conductasAMostrar: any[] = [];

  ngOnInit(): void {

    for (const conductaNane of this.conductas) {
      const findData = this.conductasColores.find(
        (conducta: any) => conducta.name === conductaNane
      );
      if (findData) {
        this.conductasAMostrar.push(findData);
      }
    }
  }

  mostrarTexto(data:any) {
    data.textoVisible = !data.textoVisible;
  }
}
