import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizManagerRoutingModule } from './quiz-manager-routing.module';
import { MainPageComponent } from '../main-page/main-page.component';
import { DrawerComponent } from '../drawer/drawer.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MaterialModule } from 'shared/materials/materials.module';
import { QuizComponent } from '../quiz/quiz.component';
import { QuizQuestionsComponent } from '../quiz/quiz-questions/quiz-questions.component';
import { QuizEndedDialogComponent } from '../quiz/quiz-ended-dialog/quiz-ended-dialog.component';
import { ResultComponent } from '../quiz/result/result.component';


@NgModule({
  declarations: [
    MainPageComponent,
    DrawerComponent,
    ToolbarComponent,
    QuizComponent,
    QuizQuestionsComponent,
    QuizEndedDialogComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    QuizManagerRoutingModule,
    MaterialModule
  ]
})
export class QuizManagerModule { }
