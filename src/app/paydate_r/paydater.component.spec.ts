import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaydateComponent } from './paydate.component';

describe('PaydateComponent', () => {
  let component: PaydateComponent;
  let fixture: ComponentFixture<PaydateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaydateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaydateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
