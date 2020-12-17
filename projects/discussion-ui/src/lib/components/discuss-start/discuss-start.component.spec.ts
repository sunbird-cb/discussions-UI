import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussStartComponent } from './discuss-start.component';

describe('DiscussStartComponent', () => {
  let component: DiscussStartComponent;
  let fixture: ComponentFixture<DiscussStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
