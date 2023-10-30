import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleAssembleComponent } from './console-assemble.component';

describe('ConsoleAssembleComponent', () => {
  let component: ConsoleAssembleComponent;
  let fixture: ComponentFixture<ConsoleAssembleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsoleAssembleComponent]
    });
    fixture = TestBed.createComponent(ConsoleAssembleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
