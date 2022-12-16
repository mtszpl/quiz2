import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Question } from '../quiz/question';
import { ResultComponent } from '../quiz/result/result.component';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit, AfterViewInit {

  @ViewChildren(ResultComponent) results!: QueryList<ResultComponent>
  result: ResultComponent | undefined

  currentQuestions: Question[] = []
  answers: number[] = []

  quizStarted: boolean = false
  displayingResults: boolean = false

  quizMap: Map<string, string> = new Map<string, string>([
    ["Ancient Roman Empire", "quiz_rome.json"],
    ["Medieval Roman Empire", "quiz_medieval_rome.json"]
  ])

  selectedQuiz: any = ""


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.results.changes.subscribe( () => {
      this.result = this.results.get(0) 
      if(this.result != undefined)
        this.result!.setResults(this.answers)
    })
  }

  startQuiz(id: string): void {
    this.quizStarted = !this.quizStarted
    this.selectedQuiz = this.quizMap.get(id)
  }

  setCurrentQuizQuestions(questions: Question[]) {
    this.currentQuestions = []
    this.currentQuestions = questions
  }

  quizAnswered(answers: number[]) {
    this.answers = answers
    this.quizStarted = false
    this.displayingResults = true
  }

  endQuiz(): void {
    console.log(this.answers)
    this.result!.setResults(this.answers)
  }

  resetScore() {
    if(this.result == undefined)
      return
    this.displayingResults = false
    this.result!.reset()
    this.currentQuestions = []
  }
}
