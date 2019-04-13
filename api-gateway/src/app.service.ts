import { Injectable, Req, Logger, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  async getProfiles(query: any, currentValues: number[]): Promise<AxiosResponse<any[]>> {
    return  this.httpService.get('http://127.0.0.1:3001/api/profile_autocomplete', {
      params: {
        query: query.query,
        type: query.type,
        currentValues,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).toPromise().then(r => r.data).catch(err => {Logger.error(err.message, err.stack, 'ApiService', true); throw err; });

  }

}
