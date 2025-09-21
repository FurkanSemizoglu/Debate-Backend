import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDebateRoomDto } from './dto/create-debate-room.dto';
import { JoinRoomDto, ParticipantRole } from './dto/join-room.dto';
import { UpdateRoomStatusDto, RoomStatus } from './dto/update-room-status.dto';

@Injectable()
export class DebateRoomService {
  constructor(private readonly prisma: PrismaService) {}

  async createDebateRoom(
    userId: string,
    createDebateRoomDto: CreateDebateRoomDto,
  ) {
    try {
      // Check if debate exists and user has permission
      const debate = await this.prisma.debate.findUnique({
        where: { id: createDebateRoomDto.debateId },
        include: { createdBy: true },
      });

      if (!debate) {
        throw new NotFoundException(
          `Debate with ID ${createDebateRoomDto.debateId} not found`,
        );
      }

      if (debate.createdById !== userId) {
        throw new ForbiddenException(
          'Only the debate creator can create rooms',
        );
      }

      const room = await this.prisma.debateRoom.create({
        data: {
          debateId: createDebateRoomDto.debateId,
        },
        include: {
          debate: {
            select: {
              id: true,
              title: true,
              topic: true,
              category: true,
            },
          },
          participants: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                  email: true,
                },
              },
            },
          },
        },
      });

      return room;
    } catch (error) {
      throw error;
    }
  }

  async joinDebateRoom(userId: string, joinRoomDto: JoinRoomDto) {
    try {
      // Check if room exists
      const room = await this.prisma.debateRoom.findUnique({
        where: { id: joinRoomDto.roomId },
        include: {
          participants: {
            where: { leftAt: null }, // Only active participants
          },
          debate: true,
        },
      });

      if (!room) {
        throw new NotFoundException(
          `Room with ID ${joinRoomDto.roomId} not found`,
        );
      }

      if (room.status === RoomStatus.FINISHED) {
        throw new BadRequestException('Cannot join a finished room');
      }

      // Check if user is already in the room
      const existingParticipant = room.participants.find(
        (p) => p.userId === userId,
      );
      if (existingParticipant) {
        throw new BadRequestException('User is already in this room');
      }

      // Check role restrictions
      if (
        joinRoomDto.role === ParticipantRole.PROPOSER ||
        joinRoomDto.role === ParticipantRole.OPPONENT
      ) {
        const existingRoleCount = room.participants.filter(
          (p) => p.role === joinRoomDto.role,
        ).length;
        if (existingRoleCount >= 1) {
          throw new BadRequestException(
            `Role ${joinRoomDto.role} is already taken`,
          );
        }
      }

      const participant = await this.prisma.debateParticipant.create({
        data: {
          roomId: joinRoomDto.roomId,
          userId: userId,
          role: joinRoomDto.role,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
              email: true,
            },
          },
          room: {
            include: {
              debate: {
                select: {
                  id: true,
                  title: true,
                  topic: true,
                },
              },
            },
          },
        },
      });

      return participant;
    } catch (error) {
      throw error;
    }
  }

  async leaveDebateRoom(userId: string, roomId: string) {
    try {
      const participant = await this.prisma.debateParticipant.findFirst({
        where: {
          roomId: roomId,
          userId: userId,
          leftAt: null,
        },
      });

      if (!participant) {
        throw new NotFoundException('User is not in this room or already left');
      }

      await this.prisma.debateParticipant.update({
        where: { id: participant.id },
        data: { leftAt: new Date() },
      });

      return { leftAt: new Date() };
    } catch (error) {
      throw error;
    }
  }

  async getDebateRooms(debateId: string) {
    try {
      const rooms = await this.prisma.debateRoom.findMany({
        where: { debateId },
        include: {
          participants: {
            where: { leftAt: null },
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                  email: true,
                },
              },
            },
          },
          debate: {
            select: {
              id: true,
              title: true,
              topic: true,
              category: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return rooms;
    } catch (error) {
      throw error;
    }
  }

  async getRoomById(roomId: string) {
    try {
      const room = await this.prisma.debateRoom.findUnique({
        where: { id: roomId },
        include: {
          participants: {
            where: { leftAt: null },
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                  email: true,
                },
              },
            },
          },
          debate: {
            select: {
              id: true,
              title: true,
              topic: true,
              category: true,
              createdBy: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                  email: true,
                },
              },
            },
          },
        },
      });

      if (!room) {
        throw new NotFoundException(`Room with ID ${roomId} not found`);
      }

      return {
        success: true,
        data: room,
      };
    } catch (error) {
      throw error;
    }
  }

  async getRoomWithDetails(roomId: string) {
    try {
      const room = await this.prisma.debateRoom.findUnique({
        where: { id: roomId },
        include: {
          debate: {
            include: {
              createdBy: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                  email: true,
                },
              },
            },
          },
          participants: {
            where: { leftAt: null }, // Sadece aktif katılımcılar
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                  email: true,
                },
              },
            },
            orderBy: { joinedAt: 'asc' },
          },
        },
      });

      if (!room) {
        throw new NotFoundException(`Room with ID ${roomId} not found`);
      }

      // Katılımcıları rollere göre gruplama
      const participants = room.participants;
      const proposers = participants.filter((p) => p.role === 'PROPOSER');
      const opponents = participants.filter((p) => p.role === 'OPPONENT');
      const audience = participants.filter((p) => p.role === 'AUDIENCE');

      return {
        room: {
          id: room.id,
          status: room.status,
          startedAt: room.startedAt,
          endedAt: room.endedAt,
          createdAt: room.createdAt,
        },
        debate: {
          id: room.debate.id,
          title: room.debate.title,
          topic: room.debate.topic,
          category: room.debate.category,
          status: room.debate.status,
          createdAt: room.debate.createdAt,
          createdBy: room.debate.createdBy,
        },
        participants: {
          proposers: proposers.map((p) => ({
            participantId: p.id,
            user: p.user,
            role: p.role,
            joinedAt: p.joinedAt,
          })),
          opponents: opponents.map((p) => ({
            participantId: p.id,
            user: p.user,
            role: p.role,
            joinedAt: p.joinedAt,
          })),
          audience: audience.map((p) => ({
            participantId: p.id,
            user: p.user,
            role: p.role,
            joinedAt: p.joinedAt,
          })),
        },
        participantCounts: {
          proposers: proposers.length,
          opponents: opponents.length,
          audience: audience.length,
          total: participants.length,
        },
        roomStatus: {
          hasProposer: proposers.length > 0,
          hasOpponent: opponents.length > 0,
          canStart: proposers.length > 0 && opponents.length > 0,
          isReady:
            proposers.length > 0 &&
            opponents.length > 0 &&
            room.status === 'WAITING',
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllRoomsWithDetails() {
    try {
      const rooms = await this.prisma.debateRoom.findMany({
        where: {
          status: {
            not: 'FINISHED',
          },
        },
        include: {
          debate: {
            include: {
              createdBy: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                  email: true,
                },
              },
            },
          },
          participants: {
            where: { leftAt: null },
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      const roomsWithDetails = rooms.map((room) => {
        const participants = room.participants;
        const proposers = participants.filter((p) => p.role === 'PROPOSER');
        const opponents = participants.filter((p) => p.role === 'OPPONENT');
        const audience = participants.filter((p) => p.role === 'AUDIENCE');

        return {
          room: {
            id: room.id,
            status: room.status,
            startedAt: room.startedAt,
            endedAt: room.endedAt,
            createdAt: room.createdAt,
          },
          debate: {
            id: room.debate.id,
            title: room.debate.title,
            topic: room.debate.topic,
            category: room.debate.category,
            status: room.debate.status,
            createdBy: room.debate.createdBy,
          },
          participantCounts: {
            proposers: proposers.length,
            opponents: opponents.length,
            audience: audience.length,
            total: participants.length,
          },
          roomStatus: {
            hasProposer: proposers.length > 0,
            hasOpponent: opponents.length > 0,
            canStart: proposers.length > 0 && opponents.length > 0,
            isReady:
              proposers.length > 0 &&
              opponents.length > 0 &&
              room.status === 'WAITING',
          },
        };
      });

      return roomsWithDetails;
    } catch (error) {
      throw error;
    }
  }

  async updateRoomStatus(
    userId: string,
    roomId: string,
    updateRoomStatusDto: UpdateRoomStatusDto,
  ) {
    try {
      const room = await this.prisma.debateRoom.findUnique({
        where: { id: roomId },
        include: {
          debate: {
            include: {
              createdBy: true,
            },
          },
        },
      });

      if (!room) {
        throw new NotFoundException(`Room with ID ${roomId} not found`);
      }

      if (room.debate.createdById !== userId) {
        throw new ForbiddenException(
          'Only the debate creator can update room status',
        );
      }

      const updateData: any = { status: updateRoomStatusDto.status };

      if (updateRoomStatusDto.status === RoomStatus.LIVE && !room.startedAt) {
        updateData.startedAt = new Date();
      } else if (
        updateRoomStatusDto.status === RoomStatus.FINISHED &&
        !room.endedAt
      ) {
        updateData.endedAt = new Date();
      }

      const updatedRoom = await this.prisma.debateRoom.update({
        where: { id: roomId },
        data: updateData,
        include: {
          participants: {
            where: { leftAt: null },
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                  email: true,
                },
              },
            },
          },
          debate: {
            select: {
              id: true,
              title: true,
              topic: true,
              category: true,
            },
          },
        },
      });

      return updatedRoom;
    } catch (error) {
      throw error;
    }
  }
}