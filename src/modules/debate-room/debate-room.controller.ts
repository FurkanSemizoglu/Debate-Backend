import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DebateRoomService } from './debate-room.service';
import { CreateDebateRoomDto } from './dto/create-debate-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { UpdateRoomStatusDto } from './dto/update-room-status.dto';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('debateRooms')
export class DebateRoomController {
  constructor(private readonly debateRoomService: DebateRoomService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createRoom(
    @Request() req,
    @Body() createDebateRoomDto: CreateDebateRoomDto,
  ) {
    return await this.debateRoomService.createDebateRoom(
      req.user.sub,
      createDebateRoomDto,
    );
  }

  @UseGuards(AuthGuard)
  @Post('join')
  async joinRoom(@Request() req, @Body() joinRoomDto: JoinRoomDto) {
    return await this.debateRoomService.joinDebateRoom(
      req.user.sub,
      joinRoomDto,
    );
  }

  @UseGuards(AuthGuard)
  @Post(':roomId/leave')
  async leaveRoom(
    @Request() req,
    @Param('roomId', ParseUUIDPipe) roomId: string,
  ) {
    return await this.debateRoomService.leaveDebateRoom(req.user.sub, roomId);
  }

  @Get('debate/:debateId')
  async getDebateRooms(@Param('debateId', ParseUUIDPipe) debateId: string) {
    return await this.debateRoomService.getDebateRooms(debateId);
  }

  @Get(':roomId')
  async getRoomWithDetails(@Param('roomId', ParseUUIDPipe) roomId: string) {
    return await this.debateRoomService.getRoomWithDetails(roomId);
  }

  @Get()
  async getAllRoomsWithDetails() {
    return await this.debateRoomService.getAllRoomsWithDetails();
  }

  @UseGuards(AuthGuard)
  @Patch(':roomId/status')
  async updateRoomStatus(
    @Request() req,
    @Param('roomId', ParseUUIDPipe) roomId: string,
    @Body() updateRoomStatusDto: UpdateRoomStatusDto,
  ) {
    return await this.debateRoomService.updateRoomStatus(
      req.user.sub,
      roomId,
      updateRoomStatusDto,
    );
  }
}