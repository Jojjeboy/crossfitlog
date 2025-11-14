import { ExerciseModel } from '@/pages/models/exercise.model';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-exercise-component',
  imports: [CommonModule],
  templateUrl: './list-exercise-component.html',
  styleUrl: './list-exercise-component.scss'
})
export class ListExerciseComponent {


  @Input() exercises?: ExerciseModel[];

  showGif: boolean = false;
  colors: string[] = ["blue", "green","yellow", "cyan", "pink", "purple"];



  toggleGif() {
    this.showGif = !this.showGif;
    let seconds = 7;
    const interval = setInterval(() => {
      console.log(seconds); // Visar nedräkningen i konsolen
      seconds--;
      if (seconds < 0) {
        this.showGif = false;
        clearInterval(interval);
      }
    }, 1000);
  }

  showPopup(passsedVal: string) {
    alert(passsedVal);
  }



}
