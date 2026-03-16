import { TestBed } from '@angular/core/testing';

import { AuthService } from './seguridad.service';

describe('SeguridadService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
