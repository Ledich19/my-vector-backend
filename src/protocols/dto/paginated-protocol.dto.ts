import { ApiProperty } from '@nestjs/swagger';
import { ProtocolDto } from './protocol.dto';

export class PaginatedProtocolsDto {
  @ApiProperty({ type: [ProtocolDto] })
  data: ProtocolDto[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
