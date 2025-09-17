import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDebateDto } from './Dto/create-debate.dto';
import { UpdateDebateDto } from './Dto/update-debate.dto';
import { CreateDebateRoomDto } from './Dto/create-debate-room.dto';
import { JoinRoomDto, ParticipantRole } from './Dto/join-room.dto';
import { UpdateRoomStatusDto, RoomStatus } from './Dto/update-room-status.dto';

@Injectable()
export class DebateService {
  constructor(private readonly prisma: PrismaService) {}

  async createDebate(userId: string, createDebateDto: CreateDebateDto) {
    try {
      // Check if user exists
      const user = await this.prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const debate = await this.prisma.debate.create({
        data: {
          title: createDebateDto.title,
          topic: createDebateDto.topic,
          category: createDebateDto.category || 'GENERAL',
          createdById: userId,
          users: {
            connect: { id: userId } // Creator automatically joins the debate
          }
        },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              surname: true,
              email: true,
            }
          },
          users: {
            select: {
              id: true,
              name: true,
              surname: true,
              email: true,
            }
          }
        }
      });

      return {
        success: true,
        message: 'Debate created successfully',
        data: debate
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  async findAllDebates(page = 1, limit = 10, status?: string) {
    try {
      const skip = (page - 1) * limit;
      
      // Build the where clause based on provided filters
      const where = status ? { status: status as any } : {};

      const [debates, total] = await Promise.all([
        this.prisma.debate.findMany({
          skip,
          take: limit,
          where,
          orderBy: { createdAt: 'desc' },
          include: {
            createdBy: {
              select: {
                id: true,
                name: true,
                surname: true,
                email: true,
              }
            },
            users: {
              select: {
                id: true,
                name: true,
                surname: true,
                email: true,
              }
            },
            _count: {
              select: {
                users: true
              }
            }
          }
        }),
        this.prisma.debate.count({ where })
      ]);

      return {
        data: debates,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  async findDebateById(id: string) {
    try {
      const debate = await this.prisma.debate.findUnique({
        where: { id },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              surname: true,
              email: true,
            }
          },
          users: {
            select: {
              id: true,
              name: true,
              surname: true,
              email: true,
            }
          }
        }
      });

      if (!debate) {
        throw new NotFoundException(`Debate with ID ${id} not found`);
      }

      return debate;
    } catch (error) {
      throw error;
    }
  }

  async updateDebate(id: string, userId: string, updateDebateDto: UpdateDebateDto) {
    try {
      // First check if debate exists and user is the creator
      const debate = await this.prisma.debate.findUnique({
        where: { id },
        select: { createdById: true }
      });

      if (!debate) {
        throw new NotFoundException(`Debate with ID ${id} not found`);
      }

      if (debate.createdById !== userId) {
        throw new ForbiddenException('Only the debate creator can update it');
      }

      return await this.prisma.debate.update({
        where: { id },
        data: updateDebateDto,
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          users: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteDebate(id: string, userId: string) {
    try {
      // First check if debate exists and user is the creator
      const debate = await this.prisma.debate.findUnique({
        where: { id },
        select: { createdById: true }
      });

      if (!debate) {
        throw new NotFoundException(`Debate with ID ${id} not found`);
      }

      if (debate.createdById !== userId) {
        throw new ForbiddenException('Only the debate creator can delete it');
      }

      await this.prisma.debate.delete({ where: { id } });
      
      return { message: 'Debate deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async joinDebate(debateId: string, userId: string) {
    try {
      // Check if debate exists
      const debate = await this.prisma.debate.findUnique({
        where: { id: debateId },
        include: {
          users: {
            where: { id: userId },
            select: { id: true }
          }
        }
      });

      if (!debate) {
        throw new NotFoundException(`Debate with ID ${debateId} not found`);
      }

      // Check if user already joined
      if (debate.users.length > 0) {
        throw new BadRequestException('You have already joined this debate');
      }

      return await this.prisma.debate.update({
        where: { id: debateId },
        data: {
          users: {
            connect: { id: userId }
          }
        },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          users: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async leaveDebate(debateId: string, userId: string) {
    try {
      // Check if debate exists
      const debate = await this.prisma.debate.findUnique({
        where: { id: debateId },
        include: {
          users: {
            where: { id: userId },
            select: { id: true }
          }
        }
      });

      if (!debate) {
        throw new NotFoundException(`Debate with ID ${debateId} not found`);
      }

      // Check if user is in the debate
      if (debate.users.length === 0) {
        throw new BadRequestException('You are not a participant in this debate');
      }

      // Check if user is the creator (creator cannot leave)
      if (debate.createdById === userId) {
        throw new BadRequestException('The debate creator cannot leave. You must delete the debate instead.');
      }

      return await this.prisma.debate.update({
        where: { id: debateId },
        data: {
          users: {
            disconnect: { id: userId }
          }
        },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          users: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async findUserDebates(userId: string, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      
      const [debates, total] = await Promise.all([
        this.prisma.debate.findMany({
          skip,
          take: limit,
          where: {
            OR: [
              { createdById: userId },
              { users: { some: { id: userId } } }
            ]
          },
          orderBy: { createdAt: 'desc' },
          include: {
            createdBy: {
              select: {
                id: true,
                name: true,
                surname: true,
                email: true,
              }
            },
            users: {
              select: {
                id: true,
                name: true,
                surname: true,
                email: true,
              }
            },
            _count: {
              select: {
                users: true
              }
            }
          }
        }),
        this.prisma.debate.count({
          where: {
            OR: [
              { createdById: userId },
              { users: { some: { id: userId } } }
            ]
          }
        })
      ]);

      return {
        data: debates,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Room-related methods
  async createDebateRoom(userId: string, createDebateRoomDto: CreateDebateRoomDto) {
    try {
      // Check if debate exists and user has permission
      const debate = await this.prisma.debate.findUnique({
        where: { id: createDebateRoomDto.debateId },
        include: { createdBy: true }
      });

      if (!debate) {
        throw new NotFoundException(`Debate with ID ${createDebateRoomDto.debateId} not found`);
      }

      if (debate.createdById !== userId) {
        throw new ForbiddenException('Only the debate creator can create rooms');
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
            }
          },
          participants: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                  email: true,
                }
              }
            }
          }
        }
      });

      return {
        success: true,
        message: 'Debate room created successfully',
        data: room
      };
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
          participants: true,
          debate: true
        }
      });

      if (!room) {
        throw new NotFoundException(`Room with ID ${joinRoomDto.roomId} not found`);
      }

      if (room.status === RoomStatus.FINISHED) {
        throw new BadRequestException('Cannot join a finished room');
      }

      // Check if user is already in the room
      const existingParticipant = room.participants.find(p => p.userId === userId);
      if (existingParticipant) {
        throw new BadRequestException('User is already in this room');
      }

      // Check role restrictions
      if (joinRoomDto.role === ParticipantRole.PROPOSER || joinRoomDto.role === ParticipantRole.OPPONENT) {
        const existingRoleCount = room.participants.filter(p => p.role === joinRoomDto.role).length;
        if (existingRoleCount >= 1) {
          throw new BadRequestException(`Role ${joinRoomDto.role} is already taken`);
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
            }
          },
          room: {
            include: {
              debate: {
                select: {
                  id: true,
                  title: true,
                  topic: true,
                }
              }
            }
          }
        }
      });

      return {
        success: true,
        message: 'Successfully joined the debate room',
        data: participant
      };
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
          leftAt: null
        }
      });

      if (!participant) {
        throw new NotFoundException('User is not in this room or already left');
      }

      await this.prisma.debateParticipant.update({
        where: { id: participant.id },
        data: { leftAt: new Date() }
      });

      return {
        success: true,
        message: 'Successfully left the debate room'
      };
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
                }
              }
            }
          },
          debate: {
            select: {
              id: true,
              title: true,
              topic: true,
              category: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      return {
        success: true,
        data: rooms
      };
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
                }
              }
            }
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
                }
              }
            }
          }
        }
      });

      if (!room) {
        throw new NotFoundException(`Room with ID ${roomId} not found`);
      }

      return {
        success: true,
        data: room
      };
    } catch (error) {
      throw error;
    }
  }

  async updateRoomStatus(userId: string, roomId: string, updateRoomStatusDto: UpdateRoomStatusDto) {
    try {
      const room = await this.prisma.debateRoom.findUnique({
        where: { id: roomId },
        include: {
          debate: {
            include: {
              createdBy: true
            }
          }
        }
      });

      if (!room) {
        throw new NotFoundException(`Room with ID ${roomId} not found`);
      }

      if (room.debate.createdById !== userId) {
        throw new ForbiddenException('Only the debate creator can update room status');
      }

      const updateData: any = { status: updateRoomStatusDto.status };

      if (updateRoomStatusDto.status === RoomStatus.LIVE && !room.startedAt) {
        updateData.startedAt = new Date();
      } else if (updateRoomStatusDto.status === RoomStatus.FINISHED && !room.endedAt) {
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
                }
              }
            }
          },
          debate: {
            select: {
              id: true,
              title: true,
              topic: true,
              category: true,
            }
          }
        }
      });

      return {
        success: true,
        message: 'Room status updated successfully',
        data: updatedRoom
      };
    } catch (error) {
      throw error;
    }
  }
}
