import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPotsComponent } from './list-pots.component';

describe('ListPotsComponent', () => {
  let component: ListPotsComponent;
  let fixture: ComponentFixture<ListPotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
