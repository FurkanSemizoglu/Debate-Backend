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
  ParseIntPipe 
} from '@nestjs/common';
import { DebateService } from './debate.service';
import { CreateDebateDto } from './Dto/create-debate.dto';
import { UpdateDebateDto } from './Dto/update-debate.dto';
import { JoinDebateDto } from './Dto/join-debate.dto';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('debates')
@UseGuards(AuthGuard)
export class DebateController {
  constructor(private readonly debateService: DebateService) {}

  @Post('createDebate')
  async create(@Request() req, @Body() createDebateDto: CreateDebateDto) {
    try {
      return await this.debateService.createDebate(req.user.sub, createDebateDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('getAllDebates')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('status') status?: string
  ) {
    try {
      return await this.debateService.findAllDebates(page, limit, status);
    } catch (error) {
      throw error;
    }
  }

  @Get('getUsersDebates')
  async findUserDebates(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    try {
      return await this.debateService.findUserDebates(req.user.sub, page, limit);
    } catch (error) {
      throw error;
    }
  }

  @Get('getDebate/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.debateService.findDebateById(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch('updateDebate/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req,
    @Body() updateDebateDto: UpdateDebateDto
  ) {
    try {
      return await this.debateService.updateDebate(id, req.user.sub, updateDebateDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete('deleteDebate/:id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    try {
      return await this.debateService.deleteDebate(id, req.user.sub);
    } catch (error) {
      throw error;
    }
  }

/*   @Post('join')
  async joinDebate(@Request() req, @Body() joinDebateDto: JoinDebateDto) {
    try {
      return await this.debateService.joinDebate(joinDebateDto.debateId, req.user.sub);
    } catch (error) {
      throw error;
    }
  }

  @Post('leave/:debateId')
  async leaveDebate(@Request() req, @Param('debateId', ParseUUIDPipe) debateId: string) {
    try {
      return await this.debateService.leaveDebate(debateId, req.user.sub);
    } catch (error) {
      throw error;
    }
  } */
}
