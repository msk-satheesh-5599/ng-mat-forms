import { TestBed } from '@angular/core/testing';

import { NgMatFormsService } from './ng-mat-forms.service';

describe('NgMatFormsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgMatFormsService = TestBed.get(NgMatFormsService);
    expect(service).toBeTruthy();
  });
});
