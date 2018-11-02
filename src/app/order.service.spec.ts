import { TestBed, inject } from '@angular/core/testing';

import { OrderService } from './order.service';

describe('OrderServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService]
    });
  });

  it('should be created', inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));
});
