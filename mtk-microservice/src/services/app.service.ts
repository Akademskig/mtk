import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FbService } from './fb.service';

@Injectable()
export class AppService {
  constructor(private fbService: FbService) { }
  async getPlacesAutocomplete(query: string, type: string, currentValues: number[]): Promise<any> {
    let places = [];
    switch (type) {
      case 'facebook':
        places = await this.fbApi(query);
        break;
      default:
        throw new HttpException('Api not implemented', HttpStatus.NOT_IMPLEMENTED);
    }
    return this.filterPlaces(places, currentValues);
  }

  fbApi(query) {
      return this.fbService.getPlaces(query);
  }

  filterPlaces(values: any, currentValues: number[]) {
    if (!currentValues || currentValues.length === 0) {
      return values;
    }
    const filtered = values.data.filter(v => !currentValues.includes(v.id));
    delete values.data;
    return Object.assign(values, { data: filtered });
  }
}
