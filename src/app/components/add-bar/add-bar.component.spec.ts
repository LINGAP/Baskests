import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBarPage } from './add-bar.page';

describe('AddBarPage', () => {
  let component: AddBarPage;
  let fixture: ComponentFixture<AddBarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
