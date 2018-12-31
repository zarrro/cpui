import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightEditorComponent } from './freight-editor.component';

describe('FreightEditorComponent', () => {
  let component: FreightEditorComponent;
  let fixture: ComponentFixture<FreightEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreightEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
