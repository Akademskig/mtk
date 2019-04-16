import { Controller, Get, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { FbService } from '../services/fb.service';
import { AutocompleteQuery } from '../models/autocompleteQuery.model';
import { ParseIntPipe } from '../pipes/parseInt.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private fbService: FbService) { }

  @Get('/api/places_autocomplete')
  async getPlacesAutocomplete(@Query() query: AutocompleteQuery): Promise<any> {
    try {
      const r = await this.appService.getPlacesAutocomplete(query.query, query.type, query.currentValues);
      return r;
    } catch (err) {
      if (err.getResponse) {
        throw new HttpException(err.getResponse(), err.getStatus());
      } else if (err.response && err.response.statusText && err.response.status) {
        throw new HttpException(err.response.statusText, err.response.status);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  @Get('/api/place_info/:id')
  async getPlaceInfo(@Param('id', new ParseIntPipe()) id): Promise<any> {
    try {
      const r = await this.fbService.getPlaceInfo(id);
      return r;
    } catch (err) {
      // tslint:disable-next-line:no-console
      if (err.getResponse) {
        throw new HttpException(err.getResponse(), err.getStatus());
      } else if (err.response && err.response.statusText && err.response.status) {
        throw new HttpException(err.response.statusText, err.response.status);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
