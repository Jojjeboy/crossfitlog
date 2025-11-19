import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { FormControl, FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { distinctUntilChanged, filter, Observable, Subscription } from 'rxjs';
import { ExerciseService } from '../service/exercise.service';
import { CompletedExerciseModel } from '../models/completedExercise.model';
import { ListCompletedExerciseComponent } from "../component/list-completed-exercise-component/list-completed-exercise-component";
import { Exercise } from '../models/exercise.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { ListExerciseComponent } from "../component/list-exercise-component/list-exercise-component";
import { ExerciseModel } from '../models/exercise.model';


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
    ReactiveFormsModule,
    ListCompletedExerciseComponent,
    ListExerciseComponent
],
    templateUrl: 'start.html',
    styleUrl: 'start.scss'

})
export class Start  {
    completedExercise$: Observable<CompletedExerciseModel[]>; // Deklarera en observable

    constructor(
        private exerciseService: ExerciseService
    ) {
        // Tilldela Observable i konstruktorn
        this.completedExercise$ = this.exerciseService.completedExercise$;
    }

    searchControl = new FormControl<string>('', {
    asyncValidators: [],
    validators: [],
    nonNullable: true,
  });

  searchTerm: string = '';
  searchResults: ExerciseModel[] = [];
  loading = false;
  selectedExercise: Exercise | null = null;
  private sub?: Subscription;



  // Denna funktion anropas när användaren skriver i sökfältet
  onSearchChange(): void {
    if (this.searchControl.value.length < 3) {
      this.searchResults = [];
      return;
    }

    this.sub = this.searchControl.valueChanges
      .pipe(
        //debounceTime(300),                // vänta 300 ms
        distinctUntilChanged(),           // sök inte samma text igen
        // narrow the value to a string so TypeScript knows `query` has `length`
        filter((query): query is string => typeof query === 'string' && query.length >= 3)   // minst 3 tecken
      )
      .subscribe(query => this.performSearch(query));
  }

  async performSearch(searchquery: string) {
    this.loading = true;
    this.searchResults = this.exerciseService.filterItemsByName(searchquery);
    this.loading = false;
    console.log('Filtrerade resultat:', this.searchResults);
  }

  showPopup(passsedVal: string) {
    alert(passsedVal);
  }

  clearSearch(){
    this.searchControl.setValue('');
  }

  clearResults(){
    this.searchResults = [];
  }


    // Och sedan använder du | async pipen i din template:
    // <div *ngFor="let exercise of exercises$ | async">...</div>
    //Detta är det rekommenderade sättet att hantera asynkron data i Angular! Låt mig veta om du vill att jag fixar din `AppComponent` så att den också använder `Observable`s korrekt.

}
