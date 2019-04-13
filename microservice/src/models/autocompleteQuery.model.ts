
import {  IsString, IsNotEmpty, IsArray } from 'class-validator';

export class AutocompleteQuery {
    @IsString()
    @IsNotEmpty()
    query: string;
    currentValues: number[];
    @IsString()
    @IsNotEmpty()
    type: string;
}
