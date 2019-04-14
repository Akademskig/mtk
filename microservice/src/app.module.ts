import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FbService } from './services/fb.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, FbService],
})
export class AppModule {}
