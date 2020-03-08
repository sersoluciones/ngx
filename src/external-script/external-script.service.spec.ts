import { TestBed } from '@angular/core/testing';

import { ExternalScriptService } from './external-script.service';

describe('ExternalScriptService', () => {
  let service: ExternalScriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalScriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
