import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('GET /api/places_autocomplete', () => {
    return request(app.getHttpServer())
      .get('/api/places_autocomplete/?type=facebook&query=sadufa&currentValues=')
      .expect(200);
  });
  it('GET /api/place_info/:id', () => {
    return request(app.getHttpServer())
      .get('/api/place_info/394549924374992')
      .expect(200);
  });
  it('GET /api/place_info/:id', () => {
    return request(app.getHttpServer())
      .get('/api/place_info/2')
      .expect(400);
  });
});
