import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Patch,
  Query,
  ParseUUIDPipe,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { DebateService } from './debate.service';
import { CreateDebateDto } from './Dto/create-debate.dto';
import { UpdateDebateDto } from './Dto/update-debate.dto';
import { JoinDebateDto } from './Dto/join-debate.dto';

import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('debates')
export class DebateController {
  constructor(private readonly debateService: DebateService) {}

  @UseGuards(AuthGuard)
  @Post('createDebate')
  async create(@Request() req, @Body() createDebateDto: CreateDebateDto) {
    return await this.debateService.createDebate(
      req.user.sub,
      createDebateDto,
    );
  }

  @Get('getAllDebates')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('status') status?: string,
  ) {
    return await this.debateService.findAllDebates(page, limit, status);
  }

  @Get('getUsersDebates')
  async findUserDebates(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.debateService.findUserDebates(
      req.user.sub,
      page,
      limit,
    );
  }

  @Get('getDebate/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.debateService.findDebateById(id);
  }

  @UseGuards(AuthGuard)
  @Patch('updateDebate/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req,
    @Body() updateDebateDto: UpdateDebateDto,
  ) {
    return await this.debateService.updateDebate(
      id,
      req.user.sub,
      updateDebateDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('deleteDebate/:id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    return await this.debateService.deleteDebate(id, req.user.sub);
  }
}
