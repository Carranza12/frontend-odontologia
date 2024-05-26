import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenciaModalComponent } from './evidencia-modal.component';

describe('EvidenciaModalComponent', () => {
  let component: EvidenciaModalComponent;
  let fixture: ComponentFixture<EvidenciaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvidenciaModalComponent]
    });
    fixture = TestBed.createComponent(EvidenciaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
