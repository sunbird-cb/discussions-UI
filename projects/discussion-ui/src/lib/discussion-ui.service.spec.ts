import { TestBed } from '@angular/core/testing';

import { DiscussionUiService } from './discussion-ui.service';

describe('DiscussionUiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscussionUiService = TestBed.get(DiscussionUiService);
    expect(service).toBeTruthy();
  });
});
