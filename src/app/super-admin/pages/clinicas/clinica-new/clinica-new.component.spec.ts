import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaNewComponent } from './clinica-new.component';

describe('ClinicaNewComponent', () => {
  let component: ClinicaNewComponent;
  let fixture: ComponentFixture<ClinicaNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClinicaNewComponent]
    });
    fixture = TestBed.createComponent(ClinicaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
