import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplideComponent } from './splide.component';

describe('SplideComponent', () => {
  let component: SplideComponent;
  let fixture: ComponentFixture<SplideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
