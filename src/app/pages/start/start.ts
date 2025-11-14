import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SearchExerciseComponent } from '../component/search-exercise-component/search-exercise-component';
import { Observable } from 'rxjs';
import { ExerciseService } from '../service/exercise.service';
import { CompletedExerciseModel } from '../models/completedExercise.model';



@Component({
    selector: 'app-start',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        MenuModule,
        FormsModule,
        InputGroupModule,
        InputGroupAddonModule,
        IftaLabelModule,
        InputNumberModule,
        SelectModule,
        FloatLabelModule,
        InputTextModule,
        SearchExerciseComponent],
    templateUrl: 'start.html',
    styleUrl: 'start.scss'

})
export class Start implements OnInit {
    completedExercise$: Observable<CompletedExerciseModel[]>; // Deklarera en observable

    constructor(
        private exerciseService: ExerciseService
    ) {
        // Tilldela Observable i konstruktorn
        this.completedExercise$ = this.exerciseService.completedExercise$;
    }

    ngOnInit(): void {
        //this.exerciseService.loadFromStorage();
    }

// Och sedan använder du | async pipen i din template:
// <div *ngFor="let exercise of exercises$ | async">...</div>
//Detta är det rekommenderade sättet att hantera asynkron data i Angular! Låt mig veta om du vill att jag fixar din `AppComponent` så att den också använder `Observable`s korrekt.

}
