import { TestBed } from '@angular/core/testing';

import { ValidateJsonService } from './validate-json.service';

describe('ValidateJsonService', () => {
  let service: ValidateJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
