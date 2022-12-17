import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizManagerRoutingModule } from './quiz-manager-routing.module';
import { MainPageComponent } from '../main-page/main-page.component';
import { DrawerComponent } from '../drawer/drawer.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MaterialModule } from 'shared/materials/materials.module';
import { QuizComponent } from '../quiz/quiz.component';
import { QuizQuestionsComponent } from '../quiz/quiz-questions/quiz-questions.component';
import { ResultComponent } from '../quiz/result/result.component';
import { QuizConstructorComponent } from '../quiz/quiz-constructior/quiz-constructor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    MainPageComponent,
    DrawerComponent,
    ToolbarComponent,
    QuizComponent,
    QuizQuestionsComponent,
    ResultComponent,
    QuizConstructorComponent
  ],
  imports: [
    CommonModule,
    QuizManagerRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class QuizManagerModule { }
