import { TestBed } from '@angular/core/testing';

import { SnackbarcontrolService } from './snackbarcontrol.service';

describe('SnackbarcontrolService', () => {
  let service: SnackbarcontrolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarcontrolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
