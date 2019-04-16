import { FbService } from './fb.service';
export declare class AppService {
    private fbService;
    constructor(fbService: FbService);
    getPlacesAutocomplete(query: string, type: string, currentValues: number[]): Promise<any>;
    fbApi(query: any): Promise<any>;
    filterPlaces(values: any, currentValues: number[]): any;
}
