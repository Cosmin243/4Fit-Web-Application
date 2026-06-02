import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymInformationComponent } from './gym-information.component';

describe('GymInformationComponent', () => {
  let component: GymInformationComponent;
  let fixture: ComponentFixture<GymInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
