import { ApiProperty } from '@nestjs/swagger';
import { EmotionEntryDTO } from './emotion-entry.dto';
import { Emotion } from 'src/emotions/entities/emotion.entity';

export class EmotionEntryWithRelationDTO extends EmotionEntryDTO {
  @ApiProperty({ type: Emotion })
  emotion?: Emotion;
}

export class GetEmotionEntriesResponseDto {
  @ApiProperty({ type: [EmotionEntryWithRelationDTO] })
  items: EmotionEntryWithRelationDTO[];

  @ApiProperty({ example: 42 })
  totalCount: number;
}
