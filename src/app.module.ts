import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { EmotionEntrieModule } from './emotion-entrie/emotion-entrie.module';
import { EmotionsModule } from './emotions/emotions.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DrizzleModule,
    EmotionEntrieModule,
    EmotionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
