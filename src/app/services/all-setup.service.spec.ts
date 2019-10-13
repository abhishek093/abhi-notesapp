import { TestBed } from '@angular/core/testing';

import { AllSetupService } from './all-setup.service';

describe('AllSetupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllSetupService = TestBed.get(AllSetupService);
    expect(service).toBeTruthy();
  });
});
