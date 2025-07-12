import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ProtocolsService } from './protocols.service';
import { CreateProtocolDto } from './dto/create-protocol.dto';
import { ProtocolDto } from './dto/protocol.dto';
import { PaginatedProtocolsDto } from './dto/paginated-protocol.dto';
import { FindProtocolsQueryDto } from './dto/find-protocols-query.dto';

@ApiTags('Protocols')
@Controller('protocols')
export class ProtocolsController {
  constructor(private readonly protocolsService: ProtocolsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new protocol' })
  @ApiBody({ type: CreateProtocolDto })
  @ApiResponse({ status: 201, description: 'Protocol successfully created' })
  create(@Body() createProtocolDto: CreateProtocolDto) {
    return this.protocolsService.create(createProtocolDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated list of protocols' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of protocols',
    type: PaginatedProtocolsDto,
  })
  findAll(@Query() query: FindProtocolsQueryDto) {
    return this.protocolsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a protocol by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Protocol found',
    type: ProtocolDto,
  })
  findOne(@Param('id') id:  number) {
    return this.protocolsService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a protocol by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Protocol successfully deleted' })
  remove(@Param('id') id:  number) {
    return this.protocolsService.remove(+id);
  }
}
