import { TestBed } from '@angular/core/testing';

import { PermsGuard } from './perms.guard';

describe('PermsGuard', () => {
  let guard: PermsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
