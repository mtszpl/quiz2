import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { QuizEndedDialogComponent } from '../quiz/quiz-ended-dialog/quiz-ended-dialog.component';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  @ViewChild(MatDrawer) drawer!: MatDrawer
  quizStarted: boolean = false

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  startQuiz(): void {
    console.log(typeof this.drawer)
    this.drawer.toggle()
    this.quizStarted = !this.quizStarted
  }

  endQuiz(score: number): void {
    console.log(`quiz over, ${score}`)
    this.quizStarted = !this.quizStarted
    let dialogRef = this.dialog.open(QuizEndedDialogComponent, {
      width: '450px',
      data: {
        "score": score
      }
    })
    dialogRef.afterClosed().subscribe( () => {
      console.log("send stuff to blockchain")
    })
  }
}
