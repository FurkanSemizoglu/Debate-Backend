import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDebateDto } from './Dto/create-debate.dto';
import { UpdateDebateDto } from './Dto/update-debate.dto';

@Injectable()
export class DebateService {
  constructor(private readonly prisma: PrismaService) {}

  async createDebate(userId: string, createDebateDto: CreateDebateDto) {
    try {
      return await this.prisma.debate.create({
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
                email: true,
              }
            },
            users: {
              select: {
                id: true,
                name: true,
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
                email: true,
              }
            },
            users: {
              select: {
                id: true,
                name: true,
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
}
