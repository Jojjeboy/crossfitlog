import { ExerciseService } from '@/pages/service/exercise.service';
import { Exercise } from '@/pages/models/exercise.interface';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, filter, Subscription } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { ListExerciseComponent } from '../list-exercise-component/list-exercise-component';
import { List } from '../List';

@Component({
  selector: 'app-search-exercise-component',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ListExerciseComponent],
  templateUrl: './search-exercise-component.html',
  styleUrl: './search-exercise-component.scss'
})
export class SearchExerciseComponent  extends List{


  constructor(
    private exerciseService: ExerciseService
  ) {
    super();
  }

  searchControl = new FormControl<string>('', {
    asyncValidators: [],
    validators: [],
    nonNullable: true,
  });

  searchTerm: string = '';
  searchResults: any[] = [];
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


}
