import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussTagsComponent } from './discuss-tags.component';

describe('DiscussTagsComponent', () => {
  let component: DiscussTagsComponent;
  let fixture: ComponentFixture<DiscussTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
