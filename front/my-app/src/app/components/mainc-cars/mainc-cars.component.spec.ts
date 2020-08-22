import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincCarsComponent } from './mainc-cars.component';

describe('MaincCarsComponent', () => {
  let component: MaincCarsComponent;
  let fixture: ComponentFixture<MaincCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaincCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaincCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
