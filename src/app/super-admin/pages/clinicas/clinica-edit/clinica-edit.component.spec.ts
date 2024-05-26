import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaEditComponent } from './clinica-edit.component';

describe('ClinicaEditComponent', () => {
  let component: ClinicaEditComponent;
  let fixture: ComponentFixture<ClinicaEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClinicaEditComponent]
    });
    fixture = TestBed.createComponent(ClinicaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
