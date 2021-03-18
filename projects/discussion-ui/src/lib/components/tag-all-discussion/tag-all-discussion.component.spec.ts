import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagAllDiscussionComponent } from './tag-all-discussion.component';

describe('TagAllDiscussionComponent', () => {
  let component: TagAllDiscussionComponent;
  let fixture: ComponentFixture<TagAllDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagAllDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagAllDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
