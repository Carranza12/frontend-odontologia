import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaConductaComponent } from './alerta-conducta.component';

describe('AlertaConductaComponent', () => {
  let component: AlertaConductaComponent;
  let fixture: ComponentFixture<AlertaConductaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertaConductaComponent]
    });
    fixture = TestBed.createComponent(AlertaConductaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
