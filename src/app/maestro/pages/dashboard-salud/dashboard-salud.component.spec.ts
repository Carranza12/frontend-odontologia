import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSaludComponent } from './dashboard-salud.component';

describe('DashboardSaludComponent', () => {
  let component: DashboardSaludComponent;
  let fixture: ComponentFixture<DashboardSaludComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardSaludComponent]
    });
    fixture = TestBed.createComponent(DashboardSaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
