import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicasComponent } from './clinicas.component';

describe('ClinicasComponent', () => {
  let component: ClinicasComponent;
  let fixture: ComponentFixture<ClinicasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClinicasComponent]
    });
    fixture = TestBed.createComponent(ClinicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
