import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestionsRetreiverService } from '../../../shared/questions-retreiver/questions-retreiver.service';

import { Question } from './question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {

  @Input() quizName: string = ""
  @Output() quizOver: EventEmitter<number[]> = new EventEmitter<number[]>()
  @Output() quizCanceledEvent: EventEmitter<number[]> = new EventEmitter<number[]>()
  @Output() questionsReceived: EventEmitter<Question[]> = new EventEmitter<Question[]>()

  subscription!: Subscription
  questions: Question[] = []

  isLoaded: boolean = false

  currentQuestion!: Question
  selectedAnswer: number = 0
  answers: number[] = []
  points: number = 0
  noQuestion: number = 0

  constructor(
    private questtionsService: QuestionsRetreiverService
  ) { }

  ngOnInit(): void {
    this.subscription = this.questtionsService.getQuestions(this.quizName).subscribe(_questions => { 
        this.questions = _questions
        this.currentQuestion = this.questions[0]
        this.isLoaded = true
        this.questionsReceived.emit(this.questions)
    })
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe()
  }

  answerSelected(answer: number) {
    this.selectedAnswer = answer
  }

  quizCancelled(): void {
    this.quizCanceledEvent.emit(this.answers)
  }

  answerConfirmed(): void {
    this.answers.push(this.selectedAnswer)
    let isCorrect: boolean = this.selectedAnswer == this.currentQuestion.correctAnswer
    console.log(typeof(this.selectedAnswer))
    console.log(typeof(this.currentQuestion.correctAnswer))
    console.log(`${this.selectedAnswer}, ${this.currentQuestion.correctAnswer}, ${this.selectedAnswer === this.currentQuestion.correctAnswer}`)
    if(isCorrect)
     this.points++
    this.nextQuestion()
  }

  nextQuestion() {
    if( this.questions.length > ++this.noQuestion)
      this.currentQuestion = this.questions[this.noQuestion]
    else{
      this.quizOver.emit(this.answers)
    }
  }

}
