import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { PacienteService } from 'src/app/empleado/services/paciente.service';

@Component({
  selector: 'app-dashboard-salud',
  templateUrl: './dashboard-salud.component.html',
  styleUrls: ['./dashboard-salud.component.scss'],
})
export class DashboardSaludComponent {
  data :any = {
    totalHistoriasClinicas: 0,
    totalPacientesDiabetes: 0,
    totalPacientes: 0,
    totalDiagnosticos: 0,
    diagnosticosSinTratamiento: 0,
    pacientesPorGenero: {
      masculino: 0,
      femenino: 0,
    },
    pacientesRecientes: []
  };

  constructor(public _pacientes: PacienteService, public _router: Router) {}

  openHistorialClinico(historia_clinica_id:string) {
    this._router.navigateByUrl('/estudiante/historia-clinica/edicion/'+ historia_clinica_id)
  }

  ngOnInit(): void {
    this._pacientes.dashboardData().subscribe((res: any) => {
      this.data = res;

      const totalPacientes =
        this.data.pacientesPorGenero.masculino +
        this.data.pacientesPorGenero.femenino;
      const porcentajeMasculino =
        (this.data.pacientesPorGenero.masculino / totalPacientes) * 100;
      const porcentajeFemenino =
        (this.data.pacientesPorGenero.femenino / totalPacientes) * 100;

      const ctx = document.getElementById(
        'diagnosticosChart'
      ) as HTMLCanvasElement;
      const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Masculino', 'Femenino'],
          datasets: [
            {
              data: [porcentajeMasculino, porcentajeFemenino],
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
              ],
              borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
            tooltip: {
              callbacks: {},
            },
          },
        },
      });
    });
  }
}
