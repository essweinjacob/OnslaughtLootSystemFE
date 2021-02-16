import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiderItemEntryComponent } from './raider-item-entry.component';

describe('RaiderItemEntryComponent', () => {
  let component: RaiderItemEntryComponent;
  let fixture: ComponentFixture<RaiderItemEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiderItemEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiderItemEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
