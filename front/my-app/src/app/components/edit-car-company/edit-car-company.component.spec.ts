import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarCompanyComponent } from './edit-car-company.component';

describe('EditCarCompanyComponent', () => {
  let component: EditCarCompanyComponent;
  let fixture: ComponentFixture<EditCarCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCarCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
