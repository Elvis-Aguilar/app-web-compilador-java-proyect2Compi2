import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProyectsComponent } from './table-proyects.component';

describe('TableProyectsComponent', () => {
  let component: TableProyectsComponent;
  let fixture: ComponentFixture<TableProyectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableProyectsComponent]
    });
    fixture = TestBed.createComponent(TableProyectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
