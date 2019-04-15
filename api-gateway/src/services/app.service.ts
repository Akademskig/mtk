import { Injectable, Req, Logger, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) { }
  async getPlaces(query: any, currentValues: number[]) {
    return this.httpService.get('http://127.0.0.1:3001/api/places_autocomplete', {
      params: {
        query: query.query,
        type: query.type,
        currentValues,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).toPromise().then(r => r.data).catch(err => { Logger.error(err.message, err.stack, 'AppService - getPlaces', true); throw err; });

  }
  async getPlaceInfo(id: number) {
    return this.httpService.get(`http://127.0.0.1:3001/api/place_info/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).toPromise().then(r => r.data).catch(err => { Logger.error(err.message, err.stack, 'ApiService - getPlaceInfo', true); throw err; });

  }

}
