import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMatFormsComponent } from './ng-mat-forms.component';

describe('NgMatFormsComponent', () => {
  let component: NgMatFormsComponent;
  let fixture: ComponentFixture<NgMatFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgMatFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMatFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
