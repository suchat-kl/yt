import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeusrComponent } from './changeusr.component';

describe('ChangeusrComponent', () => {
  let component: ChangeusrComponent;
  let fixture: ComponentFixture<ChangeusrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeusrComponent]
    });
    fixture = TestBed.createComponent(ChangeusrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
