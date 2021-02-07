import { TestBed } from '@angular/core/testing';

import { GetUniqueCharNameServiceService } from './get-unique-char-name-service.service';

describe('GetUniqueCharNameServiceService', () => {
  let service: GetUniqueCharNameServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUniqueCharNameServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
