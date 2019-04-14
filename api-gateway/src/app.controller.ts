import { Controller, Get, Res, Query, Param, HttpStatus, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { AutocompleteQuery } from './models/autocompleteQuery.model';
import { Response } from 'express';
import { ParseIntPipe } from './pipes/parseInt.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/api/profile_autocomplete')
  async getProfiles(@Query() query: AutocompleteQuery) {
    let currentValues;
    try {
      currentValues = this.validateCurrentValues(query.currentValues);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    delete query.currentValues;
    try {
      const r = await this.appService.getPlaces(query, currentValues);
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
  async getPlaceInfo(@Param('id', new ParseIntPipe()) id): Promise<any> {
    try {
      const r = await this.appService.getPlaceInfo(id);
      return r;
    } catch (err) {
      if (err.statusCode) {
        throw new HttpException(err.message, err.statusCode);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
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
