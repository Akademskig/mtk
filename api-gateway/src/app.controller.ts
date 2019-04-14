import { Controller, Get, Res, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { AutocompleteQuery } from './models/autocompleteQuery.model';
import { Response } from 'express';
import { ParseIntPipe } from './pipes/parseInt.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/api/profile_autocomplete')
  async getProfiles(@Query() query: AutocompleteQuery, @Res() res: Response) {
    let currentValues;
    try {
      currentValues = this.validateCurrentValues(query.currentValues);

    } catch (err) {
      res.status(400);
      res.json(err.message);
      return;
    }
    delete query.currentValues;
    try {
      const r = await this.appService.getProfiles(query, currentValues);
      res.json(r);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
  @Get('/api/place_info/:id')
  async getPlaceInfo(@Param('id', new ParseIntPipe()) id, @Res() res: Response): Promise<any> {
    try {
      const r = await this.appService.getPlaceInfo(id);
      res.status(200);
      res.json(r);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }

  @Get('/')
  root(@Res() res: Response) {
    res.status(200);
    res.sendFile('index.html');

  }

  validateCurrentValues(currentValues: string): number[] {
    if (currentValues.length === 0) {
      return null;
    }
    let arr;
    try {
      arr = currentValues.split(',');

    } catch (err) {
      throw new Error('Validation error!');
    }
    const nums: number[] = [];

    arr.forEach(element => {
      const val = parseInt(element, 10);
      if (!isNaN(val)) {
        nums.push(val);
      } else { throw new Error('Validation error!'); }
    });

    return nums;
  }
}
