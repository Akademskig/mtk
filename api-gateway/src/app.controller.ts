import { Controller, Get, Res, Query, Post, Logger, LoggerService } from '@nestjs/common';
import { AppService } from './app.service';
import { AxiosResponse } from 'axios';
import { AutocompleteQuery } from './models/autocompleteQuery.model';
import { ExpressAdapter } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/api/profile_autocomplete')
  async getProfiles(@Query() query: AutocompleteQuery, @Res() res): Promise<AxiosResponse<any[]>> {
    let currentValues;
    try {
      currentValues = this.validateCurrentValues(query.currentValues);

    } catch (err) {
      res.status(500);
      res.send(err.message);
      return;
    }
    delete query.currentValues;
    try {
      const r = await this.appService.getProfiles(query, currentValues);
      return res.json(r);
    } catch (err) {
      res.status(500);
      res.send(err.message);
    }

  }
  @Get()
  root(@Res() res) {
    res.sendFile('index.html');
  }

  validateCurrentValues = (currentValues: any) => {
    if (currentValues.length === 0) {
      return currentValues;
    }
    const arr = currentValues.split(',');
    const nums = [];
    arr.forEach(element => {

      const val = parseInt(element, 10);
      if (!isNaN(val)) {
        nums.push(val);
      } else { throw new Error('Validation error!'); }
    });

    return nums;
  }
}
