import { AppService } from '../services/app.service';
import { FbService } from '../services/fb.service';
import { AutocompleteQuery } from '../models/autocompleteQuery.model';
export declare class AppController {
    private readonly appService;
    private fbService;
    constructor(appService: AppService, fbService: FbService);
    getPlacesAutocomplete(query: AutocompleteQuery): Promise<any>;
    getPlaceInfo(id: any): Promise<any>;
}
