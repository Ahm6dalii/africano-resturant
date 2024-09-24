import { TestBed } from '@angular/core/testing';

import { ApiLinkService } from './api-link.service';

describe('ApiLinkService', () => {
  let service: ApiLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
