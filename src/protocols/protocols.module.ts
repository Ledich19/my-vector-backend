import { Module } from '@nestjs/common';
import { ProtocolsService } from './protocols.service';
import { ProtocolsController } from './protocols.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [ProtocolsController],
  providers: [ProtocolsService],
})
export class ProtocolsModule {}
