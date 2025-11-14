// Importera ENDAST Exercise, eftersom de andra är borttagna
import { Exercise } from './exercise.interface';

// Ändra alla typer från Equipment/BodyPart/Muscle till string[]
export class ExerciseModel implements Exercise {
    private _exerciseId: string;
    private _name: string;
    private _gifUrl: string;
    private _equipments: string[]; // <-- ÄNDRAD
    private _bodyParts: string[]; // <-- ÄNDRAD
    private _targetMuscles: string[]; // <-- ÄNDRAD
    private _secondaryMuscles: string[]; // <-- ÄNDRAD
    private _instructions: string[];

    constructor(
        exerciseId: string,
        name: string,
        gifUrl: string,
        equipments: string[], // <-- ÄNDRAD
        bodyParts: string[], // <-- ÄNDRAD
        targetMuscles: string[], // <-- ÄNDRAD
        secondaryMuscles: string[], // <-- ÄNDRAD
        instructions: string[]
    ) {
        this._exerciseId = exerciseId;
        this._name = name;
        this._gifUrl = gifUrl;
        this._equipments = equipments;
        this._bodyParts = bodyParts;
        this._targetMuscles = targetMuscles;
        this._secondaryMuscles = secondaryMuscles;
        this._instructions = instructions;
    }

    // --- Getters (Läs-åtkomst) ---

    public get exerciseId(): string {
        return this._exerciseId;
    }

    public get name(): string {
        return this._name;
    }

    public get gifUrl(): string {
        return this._gifUrl;
    }

    public get equipments(): string[] { // <-- ÄNDRAD
        return this._equipments;
    }

    public get bodyParts(): string[] { // <-- ÄNDRAD
        return this._bodyParts;
    }

    public get targetMuscles(): string[] { // <-- ÄNDRAD
        return this._targetMuscles;
    }

    public get secondaryMuscles(): string[] { // <-- ÄNDRAD
        return this._secondaryMuscles;
    }

    public get instructions(): string[] {
        return this._instructions;
    }

    // --- Setters (Skriv-åtkomst) ---

    public set exerciseId(value: string) {
        this._exerciseId = value;
    }

    public set name(value: string) {
        if (value.trim().length === 0) {
            throw new Error("Namn får inte vara tomt.");
        }
        this._name = value;
    }

    public set gifUrl(value: string) {
        this._gifUrl = value;
    }

    public set equipments(value: string[]) { // <-- ÄNDRAD
        this._equipments = value;
    }

    public set bodyParts(value: string[]) { // <-- ÄNDRAD
        this._bodyParts = value;
    }

    public set targetMuscles(value: string[]) { // <-- ÄNDRAD
        this._targetMuscles = value;
    }

    public set secondaryMuscles(value: string[]) { // <-- ÄNDRAD
        this._secondaryMuscles = value;
    }

    public set instructions(value: string[]) {
        this._instructions = value;
    }
}