import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizConstructorComponent } from './quiz-constructor.component';

describe('QuizConstructiorComponent', () => {
  let component: QuizConstructorComponent;
  let fixture: ComponentFixture<QuizConstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizConstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
