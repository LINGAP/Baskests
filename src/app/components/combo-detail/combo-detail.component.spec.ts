import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboDetailPage } from './combo-detail.page';

describe('ComboDetailPage', () => {
  let component: ComboDetailPage;
  let fixture: ComponentFixture<ComboDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
