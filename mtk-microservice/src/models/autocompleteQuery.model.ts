
import {  IsString, IsNotEmpty } from 'class-validator';

export class AutocompleteQuery {
    @IsString()
    @IsNotEmpty()
    query: string;
    currentValues: number[];
    @IsString()
    @IsNotEmpty()
    type: string;
    constructor(type: string, query: string, currentValues: number[]) {
        this.query = query;
        this.type = type;
        this.currentValues = currentValues;
    }
}
