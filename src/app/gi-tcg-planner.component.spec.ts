import { TestBed } from '@angular/core/testing';
import { GiTcgPlannerComponent } from './gi-tcg-planner.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GiTcgPlannerComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(GiTcgPlannerComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
