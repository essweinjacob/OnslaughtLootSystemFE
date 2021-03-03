import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanLootSheetVerifyComponent } from './clean-loot-sheet-verify.component';

describe('CleanLootSheetVerifyComponent', () => {
  let component: CleanLootSheetVerifyComponent;
  let fixture: ComponentFixture<CleanLootSheetVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleanLootSheetVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanLootSheetVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
