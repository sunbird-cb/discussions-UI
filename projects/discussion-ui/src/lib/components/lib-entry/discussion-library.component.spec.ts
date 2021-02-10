import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibEntryComponent } from './lib-entry.component';

describe('LibEntryComponent', () => {
  let component: LibEntryComponent;
  let fixture: ComponentFixture<LibEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
