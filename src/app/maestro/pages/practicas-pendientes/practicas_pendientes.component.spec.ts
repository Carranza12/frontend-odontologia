import { ComponentFixture, TestBed } from '@angular/core/testing';

import { practicasPendientesComponent } from './practicas-pendientes.component';

describe('practicasPendientesComponent', () => {
  let component: practicasPendientesComponent;
  let fixture: ComponentFixture<practicasPendientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [practicasPendientesComponent]
    });
    fixture = TestBed.createComponent(practicasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
