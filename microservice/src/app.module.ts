import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiService } from './app.service';
import { FbService } from './services/fb.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [ApiService, FbService],
})
export class AppModule {}
