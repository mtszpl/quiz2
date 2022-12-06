import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestionsRetreiverService } from 'src/questions-retreiver.service';

import { Question } from './question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {

  @Output() quizOver: EventEmitter<number> = new EventEmitter<number>()

  subscription!: Subscription
  questions: Question[] = []

  currentQuestion!: Question
  selectedAnswer: number = 0
  points: number = 0
  noQuestion: number = 0

  constructor(
    private questtionsService: QuestionsRetreiverService
  ) { }

  ngOnInit(): void {
    this.subscription = this.questtionsService.getQuestions().subscribe({
      next: _questions => {
        this.questions = _questions
        this.currentQuestion = this.questions[0]
      }
    })
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe()
  }

  answerSelected(answer: number) {
    this.selectedAnswer = answer
  }

  answerConfirmed(): void {
    let isCorrect: boolean = this.selectedAnswer === this.currentQuestion.correctAnswer
    if(isCorrect)
     this.points++
    console.log(isCorrect)
    this.nextQuestion()
  }

  nextQuestion() {
    if( this.questions.length > ++this.noQuestion)
      this.currentQuestion = this.questions[this.noQuestion]
    else{
      console.log("this was the last question")
      this.quizOver.emit(this.points)
    }
  }

}
