import { TestBed } from '@angular/core/testing';

import { ItemDataService } from './item-data.service';

describe('ItemDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemDataService = TestBed.get(ItemDataService);
    expect(service).toBeTruthy();
  });
});
