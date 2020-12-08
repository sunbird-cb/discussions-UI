import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussCategoryComponent } from './discuss-category.component';

describe('DiscussCategoryComponent', () => {
  let component: DiscussCategoryComponent;
  let fixture: ComponentFixture<DiscussCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
