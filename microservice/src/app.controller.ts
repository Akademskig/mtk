import { Controller, Get, Res, Query, Param, Logger, Next, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiService } from './app.service';
import { FbService } from './services/fb.service';
import { AutocompleteQuery } from './models/autocompleteQuery.model';
import { ParseIntPipe } from './pipes/parseInt.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: ApiService, private fbService: FbService ) { }

  @Get('/api/profile_autocomplete')
  async getProfileAutocomplete(@Query() query: AutocompleteQuery, @Res() res, @Next() next): Promise<any> {
    try {
      const r = await this.appService.getProfileAutocomplete(query.query, query.type, query.currentValues);
      res.status(200);
      res.json(r);
    } catch (err) {
      res.status(400);
      res.send(err.message);
      Logger.error(err.message, err.stack, 'getProfileAutocomplete');
    }
  }
  @Get('/api/place_info/:id')
  async getPlaceInfo(@Param('id', new ParseIntPipe()) id, @Res() res ): Promise < any > {
    try {
      const r = await this.fbService.getPlaceInfo(id);
      res.status(200);
      res.json(r);
    } catch (err) {
      res.status(400);
      res.send(err.message);
      Logger.error(err.message, err.stack, 'gePlaceInfo');
    }
  }
}
