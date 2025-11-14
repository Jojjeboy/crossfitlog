import { OnInit, Component } from '@angular/core';
import { ExerciseModel } from '@/pages/models/exercise.model';
import { Observable } from 'rxjs';
import { ExerciseService } from '@/pages/service/exercise.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './app.components.html'
})
export class AppComponent implements OnInit {
    
    exercises$: Observable<ExerciseModel[]>; // Deklarera en observable

    constructor(
        private exerciseService: ExerciseService

    ){
        // Tilldela Observable i konstruktorn
        this.exercises$ = this.exerciseService.exercises$; 
    }

    ngOnInit(): void {
        if (!this.exerciseService.getIsLoaded()) {
            this.exerciseService.loadDataFromDB();
        }
    }
}