import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  score: number
}

@Component({
  selector: 'app-quiz-ended-dialog',
  templateUrl: './quiz-ended-dialog.component.html',
  styleUrls: ['./quiz-ended-dialog.component.scss']
})
export class QuizEndedDialogComponent implements OnInit {

  score: number = 0

  constructor(
    public dialogRef: MatDialogRef<QuizEndedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.score = this.data.score
    console.log(typeof this.score)
  }

  calculateReward(score: number = this.score): number {
    console.log("temporary mockup")
    return score
  }

  confirmed() {
    this.dialogRef.close()
  }
}
