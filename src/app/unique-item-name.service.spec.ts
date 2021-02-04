import { TestBed } from '@angular/core/testing';

import { UniqueItemNameService } from './unique-item-name.service';

describe('UniqueItemNameService', () => {
  let service: UniqueItemNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueItemNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
