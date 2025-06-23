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
import { EmotionEntrieService } from './emotion-entrie.service';
import { CreateEmotionEntrieDto } from './dto/create-emotion-entrie.dto';
import { UpdateEmotionEntrieDto } from './dto/update-emotion-entrie.dto';
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

@ApiTags('emotion-entrie')
@Controller('emotion-entrie')
export class EmotionEntrieController {
  constructor(private readonly emotion: EmotionEntrieService) {}

  @Post()
  @ApiCreatedResponse({ type: EmotionEntryDTO })
  @ApiBadRequestResponse()
  create(
    @Body() createEmotionEntrieDto: CreateEmotionEntrieDto,
  ): Promise<EmotionEntryDTO> {
    return this.emotion.create(createEmotionEntrieDto);
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
    @Param('userId') userId: string,
  ) {
    return this.emotion.findByUserId(dto, userId);
  }

  @Get('user/:userId/count')
  @ApiOkResponse({ type: CountEmotionsByUserIdResponse, isArray: true })
  countEmotionsByUserId(@Param('userId') userId: string) {
    return this.emotion.countEmotionsByUserId(userId);
  }

  @Get(':id')
  @ApiOkResponse({ type: EmotionEntryDTO })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string) {
    return this.emotion.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: EmotionEntryDTO })
  @ApiNotFoundResponse()
  update(
    @Param('id') id: string,
    @Body() updateEmotionEntrieDto: UpdateEmotionEntrieDto,
  ) {
    return this.emotion.update(id, updateEmotionEntrieDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: EmotionEntryDTO })
  @ApiNotFoundResponse()
  remove(@Param('id') id: string) {
    return this.emotion.remove(id);
  }
}
