import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincComponent } from './mainc.component';

describe('MaincComponent', () => {
  let component: MaincComponent;
  let fixture: ComponentFixture<MaincComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaincComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaincComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
