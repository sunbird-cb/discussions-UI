import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedDiscussionComponent } from './related-discussion.component';

describe('RelatedDiscussionComponent', () => {
  let component: RelatedDiscussionComponent;
  let fixture: ComponentFixture<RelatedDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
