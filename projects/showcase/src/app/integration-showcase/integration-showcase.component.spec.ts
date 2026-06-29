import { ComponentFixture, TestBed } from '@angular/core/testing';


import { IntegrationShowcaseComponent } from './integration-showcase.component';

describe('IntegrationShowcaseComponent', () => {
  let component: IntegrationShowcaseComponent;
  let fixture: ComponentFixture<IntegrationShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrationShowcaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegrationShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
