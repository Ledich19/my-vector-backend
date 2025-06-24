import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { EmotionEntrieModule } from './emotion-entrie/emotion-entrie.module';
import { EmotionsModule } from './emotions/emotions.module';
import { ConfigModule } from '@nestjs/config';
import { ProtocolsModule } from './protocols/protocols.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DrizzleModule,
    EmotionEntrieModule,
    EmotionsModule,
    ProtocolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
