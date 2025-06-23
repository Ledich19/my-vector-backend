import { Module } from '@nestjs/common';
import { EmotionEntrieService } from './emotion-entrie.service';
import { EmotionEntrieController } from './emotion-entrie.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [EmotionEntrieController],
  providers: [EmotionEntrieService],
})
export class EmotionEntrieModule {}
