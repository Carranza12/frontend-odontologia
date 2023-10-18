import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaClinicaEditComponent } from './historia-clinica-edit.component';

describe('HistoriaClinicaEditComponent', () => {
  let component: HistoriaClinicaEditComponent;
  let fixture: ComponentFixture<HistoriaClinicaEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriaClinicaEditComponent]
    });
    fixture = TestBed.createComponent(HistoriaClinicaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
