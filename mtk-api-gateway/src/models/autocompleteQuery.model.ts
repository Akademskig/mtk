
import {  IsString, IsNotEmpty } from 'class-validator';

export class AutocompleteQuery {
    @IsString()
    @IsNotEmpty()
    query: string;
    @IsString()
    currentValues: string;
    @IsString()
    @IsNotEmpty()
    type: string;
    constructor(type: string, query: string, currentValues: string) {
        this.query = query;
        this.type = type;
        this.currentValues = currentValues;
    }
}
