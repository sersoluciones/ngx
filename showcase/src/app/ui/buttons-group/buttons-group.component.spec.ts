import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsGroupComponent } from './buttons-group.component';

describe('ButtonsGroupComponent', () => {
  let component: ButtonsGroupComponent;
  let fixture: ComponentFixture<ButtonsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
