import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Question } from 'src/app/quiz/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsRetreiverService {

  private questionsUrl: string = "api/"

  constructor(private http: HttpClient) { }

  getQuestions(url: string): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionsUrl + url).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(err: HttpErrorResponse) {
    let errorMsg = ''
    if(err.error instanceof ErrorEvent)
      errorMsg = `Error occured: ${err.error.message}`
    else
      errorMsg = `Server returned code: ${err.status}, error message is: ${err.message}`

    console.error(errorMsg)
    return throwError(() => errorMsg)
  }

}
