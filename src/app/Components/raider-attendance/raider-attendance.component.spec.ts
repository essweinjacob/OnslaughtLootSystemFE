import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiderAttendanceComponent } from './raider-attendance.component';

describe('RaiderAttendanceComponent', () => {
  let component: RaiderAttendanceComponent;
  let fixture: ComponentFixture<RaiderAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiderAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiderAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
