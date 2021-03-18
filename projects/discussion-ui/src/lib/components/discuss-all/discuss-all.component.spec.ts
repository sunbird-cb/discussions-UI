import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussAllComponent } from './discuss-all.component';

describe('DiscussAllComponent', () => {
  let component: DiscussAllComponent;
  let fixture: ComponentFixture<DiscussAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
