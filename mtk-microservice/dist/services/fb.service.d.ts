import { HttpService } from '@nestjs/common';
export declare class FbService {
    private readonly httpService;
    accessToken: string;
    tokenType: string;
    constructor(httpService: HttpService);
    fbLogin(): Promise<void>;
    getToken(): Promise<any>;
    getPlaces(query: string): Promise<any>;
    getPlaceInfo(id: number): Promise<any>;
}
