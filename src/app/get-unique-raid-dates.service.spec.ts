import { TestBed } from '@angular/core/testing';

import { GetUniqueRaidDatesService } from './get-unique-raid-dates.service';

describe('GetUniqueRaidDatesService', () => {
  let service: GetUniqueRaidDatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUniqueRaidDatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
