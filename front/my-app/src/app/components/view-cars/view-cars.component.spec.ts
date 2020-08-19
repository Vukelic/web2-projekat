import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCarsComponent } from './view-cars.component';

describe('ViewCarsComponent', () => {
  let component: ViewCarsComponent;
  let fixture: ComponentFixture<ViewCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
