import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewQuizData } from 'src/app/drawer/drawer.component';
import { Question } from '../question';

@Component({
  selector: 'app-quiz-constructior',
  templateUrl: './quiz-constructior.component.html',
  styleUrls: ['./quiz-constructior.component.scss']
})
export class QuizConstructorComponent implements OnInit {

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
    if(toRemove.answers.length == 1) {
      alert("Your quiz has to have at least one question.")
      return
    }
    let index: number = this.data.questionsInQuiz.indexOf(toRemove)
    this.data.questionsInQuiz.splice(index, 1)
  }

  removeAnswer(owner: Question, toRemove: string): void {
    if(owner.answers.length == 1) {
      alert("Your question has to have at least one answer.")
      return
    }
    let questionIndex: number = this.data.questionsInQuiz.indexOf(owner)
    let answerIndex: number = owner.answers.indexOf(toRemove)
    this.data.questionsInQuiz[questionIndex].answers.splice(answerIndex, 1)
  }

  canceledCreation(): void {
    this.reference.close()
  }

  trackByFn(index: any, item: any) {
    return index;  
  }
}
