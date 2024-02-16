import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientosComponent } from './tratamientos.component';

describe('TratamientosComponent', () => {
  let component: TratamientosComponent;
  let fixture: ComponentFixture<TratamientosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TratamientosComponent]
    });
    fixture = TestBed.createComponent(TratamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
