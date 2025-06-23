import { Controller, Get } from '@nestjs/common';
import { EmotionsService } from './emotions.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { EmotionResponseDto } from './dto/emotion-response.dto';

@Controller('emotions')
export class EmotionsController {
  constructor(private readonly emotionsService: EmotionsService) {}

  @Get()
  @ApiOkResponse({ type: [EmotionResponseDto] })
  async findAll(): Promise<EmotionResponseDto[]> {
    return this.emotionsService.findAll();
  }
}
