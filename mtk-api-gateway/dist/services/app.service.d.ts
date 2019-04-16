import { HttpService } from '@nestjs/common';
export declare class AppService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getPlaces(query: any, currentValues: number[]): Promise<any>;
    getPlaceInfo(id: number): Promise<any>;
}
