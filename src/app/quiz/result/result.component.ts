import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../question';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Output() resultAnalysisFinished: EventEmitter<void> = new EventEmitter<void>()
  @Input() _questions: Question[] = []

  _score: number = 0
  _answers: string[] = []

  constructor() { }

  ngOnInit(): void {
    
  }

  setResults(answers: number[]) {
    if(answers.length != this._questions.length){
      alert("unknown error")
      return;
    }
    for(let i = 0; i < answers.length; i++){
      this._answers.push(this._questions[i].answers[answers[i]])
      if(answers[i] === this._questions[i].correctAnswer)
      this._score++
    }

  }

  calculateReward(score: number): number {
    return score
  }

  reset() {
    this._score = 0
    this._answers = []
    this._questions = []
  }

  finishedReading() {
    this.reset()
    this.resultAnalysisFinished.emit()
  }

}
