import { PartialType } from '@nestjs/mapped-types';
import { CreateEmotionEntrieDto } from './create-emotion-entrie.dto';

export class UpdateEmotionEntrieDto extends PartialType(
  CreateEmotionEntrieDto,
) {}
