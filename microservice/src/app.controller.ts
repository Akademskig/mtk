import { Controller, Get, Res, Query, Param, Logger, Next, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { FbService } from './services/fb.service';
import { AutocompleteQuery } from './models/autocompleteQuery.model';
import { ParseIntPipe } from './pipes/parseInt.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private fbService: FbService ) { }

  @Get('/api/profile_autocomplete')
  async getPlacesAutocomplete(@Query() query: AutocompleteQuery): Promise<any> {
    try {
      const r = await this.appService.getPlacesAutocomplete(query.query, query.type, query.currentValues);
      return r;
    } catch (err) {
      if (err.statusCode) {
        throw new HttpException(err.message, err.statusCode);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  @Get('/api/place_info/:id')
  async getPlaceInfo(@Param('id', new ParseIntPipe()) id): Promise < any > {
    try {
      const r = await this.fbService.getPlaceInfo(id);
      return r;
    } catch (err) {
      if (err.statusCode) {
        throw new HttpException(err.message, err.statusCode);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
