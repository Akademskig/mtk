import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../controllers/app.controller';
import { AppService } from './app.service';
import { AutocompleteQuery } from '../models/autocompleteQuery.model';
import { Places, PlaceItem, PlaceInfo } from '../models/places.model';

jest.mock('./app.service');
describe('AppService', () => {
    let appService: AppService;
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [AppController],
            providers: [AppService],
        }).compile();
        appService = app.get(AppService);

    });
    describe('getPlaces', () => {
        it('should return a list of places', async () => {
            const query = new AutocompleteQuery('facebook', 'que', '1,2,3');
            const res = new Places([new PlaceItem(1, 'praćka')]);
            jest.spyOn(appService, 'getPlaces').mockResolvedValue(Promise.resolve(res));
            const result = await appService.getPlaces(query, [1, 2, 3]);
            expect(result).toMatchObject(expect.objectContaining(res));
        });
    });
    describe('getPlaceInfo', () => {
        it('should return a place information data', async () => {
            const res = new PlaceInfo(1, 'praćka');
            jest.spyOn(appService, 'getPlaceInfo').mockResolvedValue(Promise.resolve(res));
            const result = await appService.getPlaceInfo(1);
            expect(result).toMatchObject(expect.objectContaining(
                res,
            ));
        });
    });
});
