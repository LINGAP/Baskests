import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDetailPage } from './input-detail.page';

describe('InputDetailPage', () => {
  let component: InputDetailPage;
  let fixture: ComponentFixture<InputDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
