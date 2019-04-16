import { AppService } from '../services/app.service';
import { AutocompleteQuery } from '../models/autocompleteQuery.model';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getPlaces(query: AutocompleteQuery): Promise<any>;
    getPlaceInfo(id: any): Promise<any>;
    root(res: Response): void;
    validateCurrentValues(currentValues: string): number[];
}
