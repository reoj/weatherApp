import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonDisplayComponent } from './moon-display.component';

describe('MoonDisplayComponent', () => {
  let component: MoonDisplayComponent;
  let fixture: ComponentFixture<MoonDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoonDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoonDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
