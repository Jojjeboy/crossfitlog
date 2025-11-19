import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { ExerciseModel } from '@/pages/models/exercise.model';

@Component({
  selector: 'app-excercise-description',
  imports: [CommonModule, ChipModule, CardModule],
  templateUrl: './excercise-description.html',
  styleUrl: './excercise-description.scss'
})

export class ExcerciseDescription {

  @Input() selectedExcercise?: ExerciseModel;

}
