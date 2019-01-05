import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgFiltersStateComponent } from './dg-filters-state.component';

describe('DgFiltersStateComponent', () => {
  let component: DgFiltersStateComponent;
  let fixture: ComponentFixture<DgFiltersStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgFiltersStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgFiltersStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
