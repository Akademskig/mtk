import { Controller, Get, Res, Query, Logger, Next } from '@nestjs/common';
import { ApiService } from './app.service';
import { FbService } from './services/fb.service';
import { AutocompleteQuery } from './models/autocompleteQuery.model';

@Controller()
export class AppController {
  constructor(private readonly appService: ApiService ) { }

  @Get('/api/profile_autocomplete')
  async getProfileAutocomplete(@Query() query: AutocompleteQuery, @Res() res, @Next() next): Promise<any> {
    try {
      const r = await this.appService.getProfileAutocomplete(query.query, query.type, query.currentValues);
      res.status(200);
      res.json(r);
    } catch (err) {
      res.status(400);
      res.send(err.message);
    }
  }
}
