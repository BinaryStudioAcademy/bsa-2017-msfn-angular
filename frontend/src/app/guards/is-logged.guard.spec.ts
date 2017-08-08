import { TestBed, async, inject } from '@angular/core/testing';

import { IsLoggedGuard } from './is-logged.guard';

describe('IsLoggedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsLoggedGuard]
    });
  });

  it('should ...', inject([IsLoggedGuard], (guard: IsLoggedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
