import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentConditionCardComponent } from './current-condition-card.component';

describe('CurrentConditionCardComponent', () => {
  let component: CurrentConditionCardComponent;
  let fixture: ComponentFixture<CurrentConditionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentConditionCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentConditionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
