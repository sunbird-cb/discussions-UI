import { TestBed } from '@angular/core/testing';

import { WrapperNavigateService } from './wrapper-navigate.service';

describe('WrapperNavigateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WrapperNavigateService = TestBed.get(WrapperNavigateService);
    expect(service).toBeTruthy();
  });
});
