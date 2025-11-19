import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { CompletedOccasion } from '../../models/completedOccasion.interface'
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { Badge } from "primeng/badge";
import { CommonModule } from '@angular/common';
import { ExerciseService } from '@/pages/service/exercise.service';


@Component({
  selector: 'app-occasion-form-component',
  imports: [ReactiveFormsModule, DatePickerModule, InputNumberModule, ButtonModule, Badge, CommonModule],
  templateUrl: './occasion-form-component.html',
  styleUrl: './occasion-form-component.scss'
})

export class OccasionFormComponent implements OnInit {

  // Huvudformulärkontrollen
  occasionForm!: FormGroup;
  maxDate: Date | undefined;

  @Input() lookUpId?: string;
  @Output() notifyParent: EventEmitter<string> = new EventEmitter<string>();


  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService
  ) { }

  /**
   * Initialiserar komponenten.
   * Sätter maximalt valbart datum till dagens datum och skapar huvudformulärstrukturen.
   * Inga parametrar.
   * Returnerar ingenting (`void`).
   */
  ngOnInit(): void {
    let today = new Date();
    
    this.maxDate = new Date();
    this.maxDate.setDate(today.getDate());
    this.maxDate.setMonth(today.getMonth());
    this.maxDate.setFullYear(today.getFullYear());

    this.occasionForm = this.fb.group({
      // Vi sätter upp detta som en FormArray för att hantera en lista av tillfällen
      occasions: this.fb.array([
        this.createOccasionGroup() // Starta med minst ett tillfälle
      ])
    });
  }

  /**
   * Getter för att enkelt komma åt 'occasions' FormArray från mallen.
   * Inga parametrar.
   * @returns {FormArray} En FormArray som styr listan med träningstillfällen.
   */
  get occasions(): FormArray {
    return this.occasionForm.get('occasions') as FormArray;
  }

  /**
   * Skapar en FormGroup för ett enskilt träningstillfälle.
   * Varje tillfälle innehåller ett datum, en valfri anteckning och en array av sets.
   * Startar med ett set som standard.
   * Inga parametrar.
   * @returns {FormGroup} En ny FormGroup för ett träningstillfälle.
   */
  createOccasionGroup(): FormGroup {
    return this.fb.group({
      // date måste vara null/tom för att passa PrimeNG Calendar (Date/string)
      date: [new Date(), Validators.required],
      note: [''], // Valfri anteckning
      sets: this.fb.array([
        this.createSetGroup() // Starta varje tillfälle med minst ett set
      ])
    });
  }

  /**
   * Skapar en FormGroup för ett enskilt set, inklusive reps och vikt.
   * Båda fälten är obligatoriska.
   * Inga parametrar.
   * @returns {FormGroup} En ny FormGroup för ett set.
   */
  createSetGroup(): FormGroup {
    return this.fb.group({
      reps: [null, [Validators.required, Validators.min(1)]],
      weight: [null, [Validators.required, Validators.min(0)]]
    });
  }

  // --- Metoder för att manipulera Occasions (Tillfällen) ---

  /**
   * Lägger till en ny grupp för ett träningstillfälle i 'occasions' FormArray.
   * Inga parametrar.
   * Returnerar ingenting (`void`).
   */
  addOccasion(): void {
    this.occasions.push(this.createOccasionGroup());
  }

  /**
   * Tar bort ett träningstillfälle från 'occasions' FormArray vid ett specifikt index.
   * @param {number} occasionIndex - Index för det tillfälle som ska tas bort.
   * Returnerar ingenting (`void`).
   */
  removeOccasion(occasionIndex: number): void {
    this.occasions.removeAt(occasionIndex);
  }

  // --- Metoder för att manipulera Sets ---

  /**
   * Hämtar 'sets' FormArray från en given FormGroup för ett träningstillfälle.
   * @param {AbstractControl} occasionControl - FormGroup för ett specifikt tillfälle.
   * @returns {FormArray} En FormArray för alla sets inom det tillfället.
   */
  getSets(occasionControl: AbstractControl): FormArray {
    return occasionControl.get('sets') as FormArray;
  }

  /**
   * Lägger till en ny set-grupp i 'sets' FormArray för ett specifikt träningstillfälle.
   * @param {AbstractControl} occasionControl - FormGroup för det tillfälle där setet ska läggas till.
   * Returnerar ingenting (`void`).
   */
  addSet(occasionControl: AbstractControl): void {
    this.getSets(occasionControl).push(this.createSetGroup());
  }

  /**
   * Tar bort ett set från 'sets' FormArray för ett specifikt träningstillfälle.
   * @param {AbstractControl} occasionControl - FormGroup för tillfället.
   * @param {number} setIndex - Index för det set som ska tas bort.
   * Returnerar ingenting (`void`).
   */
  removeSet(occasionControl: AbstractControl, setIndex: number): void {
    this.getSets(occasionControl).removeAt(setIndex);
  }


  /**
   * Räknar antalet sets inom en given FormGroup för ett träningstillfälle.
   * @param {AbstractControl} occasionControl - FormGroup för ett specifikt tillfälle.
   * @returns {number} Det totala antalet sets för det tillfället.
   */
  countSets(occasionControl: AbstractControl): number {
    const sets = this.getSets(occasionControl).value;
    if (sets && Array.isArray(sets)) {
      return sets.length;
    }
    return 0;
  }

  /**
   * Hanterar formulärinskickning.
   * Om formuläret är giltigt, loggas datan och skickas till `ExerciseService`.
   * Därefter återställs formuläret och en notifiering skickas till förälderkomponenten.
   * Om formuläret är ogiltigt, loggas ett fel och alla fält markeras som "touched" för att visa valideringsfel.
   * Inga parametrar.
   * Returnerar ingenting (`void`).
   */
  onSubmit(): void {
    if (this.occasionForm.valid) {
      const formValue = this.occasionForm.value;
      console.log('Sparad data:', formValue);

      const occasions: CompletedOccasion[] = formValue.occasions;
      occasions.forEach(occasion => {
        this.exerciseService.addCompletedExercise(this.lookUpId as string, occasion);
      });

      // Här skulle du normalt skicka formValue.occasions till din backend
      this.createSetGroup();
      this.occasionForm.reset();
      this.notifyParent.emit(formValue.toString());


    } else {
      console.error('Formuläret är inte giltigt!');
      // Markera fält som ogiltiga för att visa felmeddelanden
      this.occasionForm.markAllAsTouched();
    }
  }

}