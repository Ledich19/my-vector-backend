import { PartialType } from '@nestjs/mapped-types';
import { CreateEmotionEntriesDto } from './create-emotion-entries.dto';

export class UpdateEmotionEntriesDto extends PartialType(
  CreateEmotionEntriesDto,
) {}
