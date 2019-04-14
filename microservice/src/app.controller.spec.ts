import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutocompleteQuery } from './models/autocompleteQuery.model';
import { Places, PlaceItem, PlaceInfo } from './models/places.model';
import { FbService } from './services/fb.service';

jest.mock('./app.service');
jest.mock('./services/fb.service');
describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let fbService: FbService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [AppService, FbService],
    }).compile();
    appService = app.get(AppService);
    fbService = app.get(FbService);
    appController = app.get(AppController);

  });

  describe('getPlacesAutocomplete', () => {
    it('should return a list of places', async () => {
      const query = new AutocompleteQuery('facebook', 'que', [1, 2, 3]);
      const res = new Places([new PlaceItem(1, 'praćka')]);
      jest.spyOn(appService, 'getPlacesAutocomplete').mockResolvedValue(Promise.resolve(res));
      const result = await appController.getPlacesAutocomplete(query);
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
      jest.spyOn(fbService, 'getPlaceInfo').mockResolvedValue(Promise.resolve(res));
      const result = await appController.getPlaceInfo(1);
      expect(result).toMatchObject(expect.objectContaining(
        res,
      ));
    });
  });
});
