import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { QuestionsRetreiverService } from 'shared/questions-retreiver/questions-retreiver.service';
import { Question } from '../quiz/question';
import { QuizConstructorComponent } from '../quiz/quiz-constructior/quiz-constructor.component';
import { ResultComponent } from '../quiz/result/result.component';

export class NewQuizData {
  name: string = ""
  questionsInQuiz: Question[] = []
}

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(ResultComponent) results!: QueryList<ResultComponent>
  result: ResultComponent | undefined

  currentQuestions: Question[] = []
  answers: number[] = []

  quizStarted: boolean = false
  displayingResults: boolean = false

  quizList: any[] = [
    "Ancient_Rome",
    "Medieval_Rome"]

  selectedQuiz: any = ""


  constructor(
    private dialog: MatDialog,
    private questionsRetreiver: QuestionsRetreiverService
  ) { }

  ngOnInit(): void {
    this.questionsRetreiver.getQuizes().subscribe(keys => {
      this.quizList = []
      keys.forEach( key => {
        this.quizList.push(key)
      })
    })
  }

  ngAfterViewInit(): void {
    this.results.changes.subscribe( () => {
      this.result = this.results.get(0) 
      if(this.result != undefined)
        this.result!.setResults(this.answers)
    })
  }

  ngOnDestroy(): void {
      //this.keysSubscription.unsubscribe()
  }

  startQuiz(id: number): void {
    this.resetScore()
    this.quizStarted = !this.quizStarted
    this.selectedQuiz = this.quizList[id]
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
      data: { name: "", questionsInQuiz: []}
    })

    dialogRef.afterClosed().subscribe( quiz => {
      console.log(quiz)
      if(this.checkIfQuizCorrect(quiz)){
        console.log("adding quiz...")
        this.quizList.push(quiz.name)
        this.questionsRetreiver.addQuiz(quiz.name, quiz.questionsInQuiz)
      }
    })
  }

  checkIfQuizCorrect(quiz: NewQuizData): boolean {
    let isCorrect: boolean = true
    let errorMessage: string = ""
    if(!quiz.name) {
      console.log(quiz)
      isCorrect = false
      errorMessage += "Your quiz needs a name.\n"
    }
    if(quiz.questionsInQuiz.length < 1) {
      isCorrect = false
      errorMessage += "Your quiz needs questions.\n"
    }
    if(errorMessage != "")
      alert(errorMessage)
    return isCorrect
  }
}
