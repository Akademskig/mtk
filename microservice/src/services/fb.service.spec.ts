import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../controllers/app.controller';
import { AppService } from './app.service';
import { AutocompleteQuery } from '../models/autocompleteQuery.model';
import { Places, PlaceItem, PlaceInfo } from '../models/places.model';
import { FbService } from './fb.service';

jest.mock('./fb.service');
describe('FbService', () => {
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

    });
    describe('getPlaces', () => {
        it('should return a list of places', async () => {
            const query = 'praćka';
            const res = new Places([new PlaceItem(1, 'praćka')]);
            jest.spyOn(fbService, 'getPlaces').mockResolvedValue(Promise.resolve(res));
            const result = await fbService.getPlaces(query);
            expect(result).toMatchObject(expect.objectContaining(res));
        });
    });
    describe('getPlaceInfo', () => {
        it('should return a place information data', async () => {
            const res = new PlaceInfo(1, 'praćka');
            jest.spyOn(fbService, 'getPlaceInfo').mockResolvedValue(Promise.resolve(res));
            const result = await fbService.getPlaceInfo(1);
            expect(result).toMatchObject(expect.objectContaining(
                res,
            ));
        });
    });
});
