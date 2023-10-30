import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleClikeComponent } from './console-clike.component';

describe('ConsoleClikeComponent', () => {
  let component: ConsoleClikeComponent;
  let fixture: ComponentFixture<ConsoleClikeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsoleClikeComponent]
    });
    fixture = TestBed.createComponent(ConsoleClikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
