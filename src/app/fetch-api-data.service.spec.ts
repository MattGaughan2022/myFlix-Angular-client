import { TestBed } from '@angular/core/testing';

import { ApiFetch } from './fetch-api-data.service';

describe('FetchApiDataService', () => {
  let service: ApiFetch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFetch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
