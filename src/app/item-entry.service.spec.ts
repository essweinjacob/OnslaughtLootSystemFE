import { TestBed } from '@angular/core/testing';

import { ItemEntryService } from './item-entry.service';

describe('ItemEntryService', () => {
  let service: ItemEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
