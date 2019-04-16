import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { FbService } from './services/fb.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, FbService],
})
export class AppModule {}
