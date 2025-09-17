import { Test, TestingModule } from '@nestjs/testing';
import { DebateService } from '../debate.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateDebateRoomDto } from '../Dto/create-debate-room.dto';
import { JoinRoomDto, ParticipantRole } from '../Dto/join-room.dto';

describe('DebateService - Room Operations', () => {
  let service: DebateService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    debateRoom: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
    debateParticipant: {
      create: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    debate: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DebateService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<DebateService>(DebateService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createDebateRoom', () => {
    it('should create a debate room successfully', async () => {
      const userId = 'user-1';
      const createDebateRoomDto: CreateDebateRoomDto = {
        debateId: 'debate-1',
      };

      const mockDebate = {
        id: 'debate-1',
        createdById: userId,
        createdBy: { id: userId, name: 'Test User' },
      };

      const mockRoom = {
        id: 'room-1',
        debateId: 'debate-1',
        status: 'WAITING',
        debate: mockDebate,
        participants: [],
      };

      mockPrismaService.debate.findUnique.mockResolvedValue(mockDebate);
      mockPrismaService.debateRoom.create.mockResolvedValue(mockRoom);

      const result = await service.createDebateRoom(userId, createDebateRoomDto);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockRoom);
      expect(mockPrismaService.debateRoom.create).toHaveBeenCalledWith({
        data: { debateId: createDebateRoomDto.debateId },
        include: expect.any(Object),
      });
    });
  });

  describe('joinDebateRoom', () => {
    it('should join a debate room successfully', async () => {
      const userId = 'user-1';
      const joinRoomDto: JoinRoomDto = {
        roomId: 'room-1',
        role: ParticipantRole.PROPOSER,
      };

      const mockRoom = {
        id: 'room-1',
        status: 'WAITING',
        participants: [],
        debate: { id: 'debate-1' },
      };

      const mockParticipant = {
        id: 'participant-1',
        roomId: 'room-1',
        userId: userId,
        role: ParticipantRole.PROPOSER,
        user: { id: userId, name: 'Test User' },
        room: mockRoom,
      };

      mockPrismaService.debateRoom.findUnique.mockResolvedValue(mockRoom);
      mockPrismaService.debateParticipant.create.mockResolvedValue(mockParticipant);

      const result = await service.joinDebateRoom(userId, joinRoomDto);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockParticipant);
    });
  });
});
