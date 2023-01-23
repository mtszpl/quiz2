import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Question } from 'src/app/quiz/question';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class QuestionsRetreiverService {

  constructor(
    private quizDatabase: AngularFireDatabase
    ) {    }

  getQuizes() {
    return this.quizDatabase.list('Quizes/').snapshotChanges()
    .pipe(map(items => {
      return items.map(a => {
        const key = a.payload.key
        return key
      })
    }))
  }

  getQuestions(url: string): Observable<Question[]> {
    return this.quizDatabase.list<Question>(`/Quizes/${url}`).valueChanges()
  }

  addQuiz(newName: string, newQuestions: Question[]) {
    let i = 0;
    newQuestions.forEach(question => {
      this.quizDatabase.list(`/Quizes/${newName}/`).set( `question${i}`, question)
      i++
    });
  }

}
