import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCarComponent } from './reservation-car.component';

describe('ReservationCarComponent', () => {
  let component: ReservationCarComponent;
  let fixture: ComponentFixture<ReservationCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
