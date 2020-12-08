import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussCardComponent } from './discuss-card.component';

describe('DiscussCardComponent', () => {
  let component: DiscussCardComponent;
  let fixture: ComponentFixture<DiscussCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
