import { Injectable, Logger, HttpService } from '@nestjs/common';
import * as FB from 'fb';
import { FbService } from './services/fb.service';

@Injectable()
export class ApiService {
  constructor(private fbService: FbService) { }
  async getProfileAutocomplete(query: string, type: string, currentValues: number[]): Promise<any> {
    let places = [];
    switch (type) {
      case 'facebook':
        places = await this.fbApi(query);
        break;
      default:
        return;
    }
    return this.filterPlaces(places, currentValues);
  }

  fbApi(query) {
    try {
      return this.fbService.getPlaces(query);

    } catch (err) {
      Logger.error(err, err.stack, 'ApiService - controller');
    }
  }

  filterPlaces(values: any, currentValues: number[]) {
    if (!currentValues) {
      return values;
    }
    const filtered = values.data.filter(v => !currentValues.includes(v.id));
    delete values.data;
    return Object.assign(values, { data: filtered });
  }
}
