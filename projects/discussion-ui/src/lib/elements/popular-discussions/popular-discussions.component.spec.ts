import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularDiscussionsComponent } from './popular-discussions.component';

describe('PopularDiscussionsComponent', () => {
  let component: PopularDiscussionsComponent;
  let fixture: ComponentFixture<PopularDiscussionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularDiscussionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularDiscussionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
