import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpService, HttpModule, Res, Logger } from '@nestjs/common';
import { AutocompleteQuery } from './models/autocompleteQuery.model';
import { Places, PlaceItem, PlaceInfo } from './models/places.model';

jest.mock('./app.service');
describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  const httpService = new HttpService();
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    appService = new AppService(httpService);
    appController = new AppController(appService);

  });

  describe('getPlaces', () => {
    it('should return a list of places', async () => {
      const query = new AutocompleteQuery('facebook', 'que', '1,2,3');
      const res = new Places([new PlaceItem(1, 'praćka')]);
      jest.spyOn(appService, 'getProfiles').mockResolvedValue(Promise.resolve(res));
      const result = await appController.getProfiles(query);
      expect(result).toMatchObject(expect.objectContaining({
        data: [{
          id: expect.any(Number),
          name: expect.any(String),
        }],
      }));
    });
  });
  describe('getPlaceInfo', () => {
    it('should return a place information data', async () => {
      const res = new PlaceInfo(1, 'praćka');
      jest.spyOn(appService, 'getPlaceInfo').mockResolvedValue(Promise.resolve(res));
      const result = await appController.getPlaceInfo(1);
      expect(result).toMatchObject(expect.objectContaining(
        res,
      ));
    });
  });
  describe('validate an array of numbers', () => {
    it('should return an array of numbers', () => {
      const query = new AutocompleteQuery('facebook', 'que', '1,2,3');
      const result = appController.validateCurrentValues(query.currentValues);
      expect(result).toEqual(expect.arrayContaining([1, 2, 3]));
    });
    it('should throw an error on invalid query', () => {
      const query = new AutocompleteQuery('facebook', 'que', 'd,2,3');
      expect(() => { appController.validateCurrentValues(query.currentValues); }).toThrow('Validation error!');
    });
  });

});
