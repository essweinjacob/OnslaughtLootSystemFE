import { TestBed } from '@angular/core/testing';

import { RosterAllEntriesService } from './roster-all-entries.service';

describe('RosterAllEntriesService', () => {
  let service: RosterAllEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RosterAllEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
