import { TestBed, inject } from '@angular/core/testing';

import { AppNavigationService } from './appnavigation.service';

describe('AppNavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppNavigationService]
    });
  });

  it('should be created', inject([AppNavigationService], (service: AppNavigationService) => {
    expect(service).toBeTruthy();
  }));
});
