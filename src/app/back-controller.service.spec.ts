import { TestBed, inject } from '@angular/core/testing';

import { BackControllerService } from './back-controller.service';

describe('BackControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackControllerService]
    });
  });

  it('should be created', inject([BackControllerService], (service: BackControllerService) => {
    expect(service).toBeTruthy();
  }));
});
