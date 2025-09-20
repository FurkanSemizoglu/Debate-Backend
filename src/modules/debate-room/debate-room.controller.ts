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
@UseGuards(AuthGuard)
export class DebateRoomController {
  constructor(private readonly debateRoomService: DebateRoomService) {}

  @Post('create')
  async createRoom(
    @Request() req,
    @Body() createDebateRoomDto: CreateDebateRoomDto,
  ) {
    try {
      return await this.debateRoomService.createDebateRoom(
        req.user.sub,
        createDebateRoomDto,
      );
    } catch (error) {
      throw error;
    }
  }

  @Post('join')
  async joinRoom(@Request() req, @Body() joinRoomDto: JoinRoomDto) {
    try {
      return await this.debateRoomService.joinDebateRoom(
        req.user.sub,
        joinRoomDto,
      );
    } catch (error) {
      throw error;
    }
  }

  @Post(':roomId/leave')
  async leaveRoom(
    @Request() req,
    @Param('roomId', ParseUUIDPipe) roomId: string,
  ) {
    try {
      return await this.debateRoomService.leaveDebateRoom(req.user.sub, roomId);
    } catch (error) {
      throw error;
    }
  }

  @Get('debate/:debateId')
  async getDebateRooms(@Param('debateId', ParseUUIDPipe) debateId: string) {
    try {
      return await this.debateRoomService.getDebateRooms(debateId);
    } catch (error) {
      throw error;
    }
  }

  @Get(':roomId')
  async getRoomWithDetails(@Param('roomId', ParseUUIDPipe) roomId: string) {
    try {
      return await this.debateRoomService.getRoomWithDetails(roomId);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getAllRoomsWithDetails() {
    try {
      return await this.debateRoomService.getAllRoomsWithDetails();
    } catch (error) {
      throw error;
    }
  }

  @Patch(':roomId/status')
  async updateRoomStatus(
    @Request() req,
    @Param('roomId', ParseUUIDPipe) roomId: string,
    @Body() updateRoomStatusDto: UpdateRoomStatusDto,
  ) {
    try {
      return await this.debateRoomService.updateRoomStatus(
        req.user.sub,
        roomId,
        updateRoomStatusDto,
      );
    } catch (error) {
      throw error;
    }
  }
}