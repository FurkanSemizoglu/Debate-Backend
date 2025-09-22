import { Test, TestingModule } from '@nestjs/testing';
import { DebateRoomService } from '../debate-room.service';
import { PrismaService } from '../../../prisma/prisma.service';

describe('DebateRoomService', () => {
  let service: DebateRoomService;
  let prismaService: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const mockPrismaService = {
      debate: {
        findUnique: jest.fn(),
      },
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
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DebateRoomService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<DebateRoomService>(DebateRoomService);
    prismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createDebateRoom', () => {
    it('should create a debate room successfully', async () => {
    });
  });

  describe('joinDebateRoom', () => {
    it('should allow user to join a room', async () => {
    });
  });

  describe('leaveDebateRoom', () => {
    it('should allow user to leave a room', async () => {
    });
  });
});