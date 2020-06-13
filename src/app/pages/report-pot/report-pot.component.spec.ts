import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPotComponent } from './report-pot.component';

describe('ReportPotComponent', () => {
  let component: ReportPotComponent;
  let fixture: ComponentFixture<ReportPotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
