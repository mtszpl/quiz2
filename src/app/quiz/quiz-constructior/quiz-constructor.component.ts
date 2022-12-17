import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewQuizData } from 'src/app/drawer/drawer.component';
import { Question } from '../question';

@Component({
  selector: 'app-quiz-constructior',
  templateUrl: './quiz-constructior.component.html',
  styleUrls: ['./quiz-constructior.component.scss']
})
export class QuizConstructorComponent implements OnInit {
  nameFormControl = new FormControl('', [Validators.required])

  constructor(
    public reference: MatDialogRef<QuizConstructorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewQuizData
  ) {   }

  ngOnInit(): void {
  }

  addQuestion(): void {
    this.data.questionsInQuiz.push(new Question())
  }

  addAnswer(toAddAnswer: Question): void {
    toAddAnswer.answers.push("")
  }

  removeQuestion(toRemove: Question): void {
    let index: number = this.data.questionsInQuiz.indexOf(toRemove)
    this.data.questionsInQuiz.splice(index, 1)
  }

  removeAnswer(owner: Question, toRemove: string): void {
    let questionIndex: number = this.data.questionsInQuiz.indexOf(owner)
    let answerIndex: number = owner.answers.indexOf(toRemove)
    this.data.questionsInQuiz[questionIndex].answers.splice(answerIndex, 1)
  }

  canceledCreation(): void {
    this.reference.close()
  }
}
