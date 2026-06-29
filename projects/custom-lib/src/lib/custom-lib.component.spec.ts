import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLibComponent } from './custom-lib.component';

describe('CustomLibComponent', () => {
  let component: CustomLibComponent;
  let fixture: ComponentFixture<CustomLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
