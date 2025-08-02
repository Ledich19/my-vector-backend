import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { EmotionEntriesModule } from './emotion-entries/emotion-entries.module';
import { EmotionsModule } from './emotions/emotions.module';
import { ConfigModule } from '@nestjs/config';
import { ProtocolsModule } from './protocols/protocols.module';
import { PlansModule } from './plans/plans.module';
import { ExercisesModule } from './exercises/exercises.module';
import { SurveysModule } from './surveys/surveys.module';
import { PsyPlansModule } from './psy-plans/psy-plans.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DrizzleModule,
    EmotionEntriesModule,
    EmotionsModule,
    ProtocolsModule,
    PlansModule,
    ExercisesModule,
    SurveysModule,
    PsyPlansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
