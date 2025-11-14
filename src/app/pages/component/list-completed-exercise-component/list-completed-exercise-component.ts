import { CompletedExerciseModel } from '@/pages/models/completedExercise.model';
import { Component, Input } from '@angular/core';
import { List } from '../List';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-completed-exercise-component',
  imports: [CommonModule],
  templateUrl: './list-completed-exercise-component.html',
  styleUrl: './list-completed-exercise-component.scss'
})
export class ListCompletedExerciseComponent extends List {

  @Input() completedExercises?: CompletedExerciseModel[] | null;

  

  showPopup(passsedVal: string) {
    alert(passsedVal);
  }
}
