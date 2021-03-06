import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../controllers/app.controller';
import { AppService } from './app.service';
import { AutocompleteQuery } from '../models/autocompleteQuery.model';
import { Places, PlaceItem } from '../models/places.model';
import { FbService } from './fb.service';

jest.mock('./app.service');
jest.mock('./fb.service');
describe('AppService', () => {
    let appService: AppService;
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [AppController],
            providers: [AppService, FbService],
        }).compile();
        appService = app.get(AppService);

    });
    describe('getPlacesAutocomplete', () => {
        it('should return a list of places', async () => {
            const query = new AutocompleteQuery('facebook', 'que', [1, 2, 3]);
            const res = new Places([new PlaceItem(1, 'praćka')]);
            jest.spyOn(appService, 'getPlacesAutocomplete').mockResolvedValue(Promise.resolve(res));
            const result = await appService.getPlacesAutocomplete(query.query, query.type, query.currentValues);
            expect(result).toMatchObject(expect.objectContaining(res));
        });
    });
});
