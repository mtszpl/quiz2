import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Question } from '../quiz/question';
import { QuizConstructorComponent } from '../quiz/quiz-constructior/quiz-constructor.component';
import { ResultComponent } from '../quiz/result/result.component';
import { writeFileSync } from 'fs';

export class NewQuizData {
  name: string = ""
  questionsInQuiz: Question[] = []
}

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit, AfterViewInit {

  @ViewChildren(ResultComponent) results!: QueryList<ResultComponent>
  result: ResultComponent | undefined

  newQuiz: NewQuizData = new NewQuizData()

  currentQuestions: Question[] = []
  answers: number[] = []

  quizStarted: boolean = false
  displayingResults: boolean = false

  quizMap: Map<string, string> = new Map<string, string>([
    ["Ancient Roman Empire", "quiz_rome.json"],
    ["Medieval Roman Empire", "quiz_medieval_rome.json"]
  ])

  selectedQuiz: any = ""


  constructor(
    private dialog: MatDialog
  ) { }

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

  addNewQuiz() {
    let dialogRef = this.dialog.open(QuizConstructorComponent, {
      width: '450px',
      maxHeight: '90vh',
      data: { name: this.newQuiz.name, questionsInQuiz: this.newQuiz.questionsInQuiz}
    })

    dialogRef.afterClosed().subscribe( quiz => {
      let questionsOfNewQuiz: string = JSON.stringify(this.newQuiz.questionsInQuiz)
      console.log(questionsOfNewQuiz)
      //save quiz to db
      //this.quizMap.set(`${this.newQuiz.name}.json`, this.newQuiz.name)
    })
  }
}
