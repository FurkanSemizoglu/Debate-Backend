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
import { CreateDebateRoomDto } from './Dto/create-debate-room.dto';
import { JoinRoomDto } from './Dto/join-room.dto';
import { UpdateRoomStatusDto } from './Dto/update-room-status.dto';
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

  // Room endpoints
  @Post('rooms/create')
  async createRoom(@Request() req, @Body() createDebateRoomDto: CreateDebateRoomDto) {
    try {
      return await this.debateService.createDebateRoom(req.user.sub, createDebateRoomDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('rooms/join')
  async joinRoom(@Request() req, @Body() joinRoomDto: JoinRoomDto) {
    try {
      return await this.debateService.joinDebateRoom(req.user.sub, joinRoomDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('rooms/:roomId/leave')
  async leaveRoom(@Request() req, @Param('roomId', ParseUUIDPipe) roomId: string) {
    try {
      return await this.debateService.leaveDebateRoom(req.user.sub, roomId);
    } catch (error) {
      throw error;
    }
  }

  @Get('rooms/:debateId')
  async getDebateRooms(@Param('debateId', ParseUUIDPipe) debateId: string) {
    try {
      return await this.debateService.getDebateRooms(debateId);
    } catch (error) {
      throw error;
    }
  }

  @Get('room/:roomId')
  async getRoomById(@Param('roomId', ParseUUIDPipe) roomId: string) {
    try {
      return await this.debateService.getRoomById(roomId);
    } catch (error) {
      throw error;
    }
  }

  @Patch('rooms/:roomId/status')
  async updateRoomStatus(
    @Request() req, 
    @Param('roomId', ParseUUIDPipe) roomId: string,
    @Body() updateRoomStatusDto: UpdateRoomStatusDto
  ) {
    try {
      return await this.debateService.updateRoomStatus(req.user.sub, roomId, updateRoomStatusDto);
    } catch (error) {
      throw error;
    }
  }
}
