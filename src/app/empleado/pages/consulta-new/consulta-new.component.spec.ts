import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaNewComponent } from './consulta-new.component';

describe('ConsultaNewComponent', () => {
  let component: ConsultaNewComponent;
  let fixture: ComponentFixture<ConsultaNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaNewComponent]
    });
    fixture = TestBed.createComponent(ConsultaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
