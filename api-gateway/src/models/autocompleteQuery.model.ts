
import {  IsString, IsNotEmpty } from 'class-validator';
import { DecodeURIPipe } from 'src/pipes/decodeURI.pipe';

export class AutocompleteQuery {
    @IsString()
    @IsNotEmpty()
    query: string;
    currentValues: number[];
    @IsString()
    @IsNotEmpty()
    type: string;
}
