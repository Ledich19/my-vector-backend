import { Module } from '@nestjs/common';
import { EmotionEntriesService } from './emotion-entries.service';
import { EmotionEntriesController } from './emotion-entries.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [EmotionEntriesController],
  providers: [EmotionEntriesService],
})
export class EmotionEntriesModule {}
