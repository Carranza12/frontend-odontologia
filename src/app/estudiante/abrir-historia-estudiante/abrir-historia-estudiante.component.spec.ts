import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirHistoriaEstudianteComponent } from './abrir-historia-estudiante.component';

describe('AbrirHistoriaEstudianteComponent', () => {
  let component: AbrirHistoriaEstudianteComponent;
  let fixture: ComponentFixture<AbrirHistoriaEstudianteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbrirHistoriaEstudianteComponent]
    });
    fixture = TestBed.createComponent(AbrirHistoriaEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
