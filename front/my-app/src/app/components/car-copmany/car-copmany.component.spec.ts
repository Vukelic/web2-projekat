import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCopmanyComponent } from './car-copmany.component';

describe('CarCopmanyComponent', () => {
  let component: CarCopmanyComponent;
  let fixture: ComponentFixture<CarCopmanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarCopmanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCopmanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
