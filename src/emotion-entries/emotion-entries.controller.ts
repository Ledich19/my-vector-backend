import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmotionEntriesService } from './emotion-entries.service';
import { CreateEmotionEntriesDto } from './dto/create-emotion-entries.dto';
import { UpdateEmotionEntriesDto } from './dto/update-emotion-entries.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { EmotionEntryDTO } from './dto/emotion-entry.dto';
import { FindEmotionEntriesQueryDto } from './dto/find-emotion-entries-query.dto';
import { CountEmotionsByUserIdResponse } from './dto/count-emotions-by-user-id.response';
import { GetEmotionEntriesResponseDto } from './dto/get-emotion-entries-response.dto';

@ApiTags('emotion-entries')
@Controller('emotion-entries')
export class EmotionEntriesController {
  constructor(private readonly emotion: EmotionEntriesService) {}

  @Post()
  @ApiCreatedResponse({ type: EmotionEntryDTO })
  @ApiBadRequestResponse()
  create(
    @Body() createEmotionEntriesDto: CreateEmotionEntriesDto,
  ): Promise<EmotionEntryDTO> {
    return this.emotion.create(createEmotionEntriesDto);
  }

  @Get()
  @ApiOkResponse({ type: EmotionEntryDTO, isArray: true })
  findAll() {
    return this.emotion.findAll();
  }

  @Get('user/:userId')
  @ApiOkResponse({ type: GetEmotionEntriesResponseDto, isArray: true })
  findByUserId(
    @Query() dto: FindEmotionEntriesQueryDto,
    @Param('userId') userId: number,
  ) {
    return this.emotion.findByUserId(dto, userId);
  }

  @Get('user/:userId/count')
  @ApiOkResponse({ type: CountEmotionsByUserIdResponse, isArray: true })
  countEmotionsByUserId(@Param('userId') userId: number) {
    return this.emotion.countEmotionsByUserId(userId);
  }

  @Get(':id')
  @ApiOkResponse({ type: EmotionEntryDTO })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: number) {
    return this.emotion.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: EmotionEntryDTO })
  @ApiNotFoundResponse()
  update(
    @Param('id') id: number,
    @Body() updateEmotionEntriesDto: UpdateEmotionEntriesDto,
  ) {
    return this.emotion.update(id, updateEmotionEntriesDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: EmotionEntryDTO })
  @ApiNotFoundResponse()
  remove(@Param('id') id: number) {
    return this.emotion.remove(id);
  }
}
