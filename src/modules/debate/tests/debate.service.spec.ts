import { Test, TestingModule } from '@nestjs/testing';
import { DebateService } from '../debate.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { CreateDebateDto } from '../Dto/create-debate.dto';
import { UpdateDebateDto } from '../Dto/update-debate.dto';

// Mock data
const mockDebate = {
  id: 'debate-id',
  title: 'Test Debate',
  topic: 'Testing',
  status: 'PENDING',
  createdAt: new Date(),
  createdById: 'user-id',
  createdBy: {
    id: 'user-id',
    name: 'Test User',
    email: 'test@example.com',
  },
  users: [
    {
      id: 'user-id',
      name: 'Test User',
      email: 'test@example.com',
    }
  ]
};

const mockPrismaService = {
  debate: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  $transaction: jest.fn((callback) => callback(mockPrismaService)),
};

describe('DebateService', () => {
  let service: DebateService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DebateService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<DebateService>(DebateService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createDebate', () => {
    it('should create a debate successfully', async () => {
      // Arrange
      const userId = 'user-id';
      const createDebateDto: CreateDebateDto = {
        title: 'Test Debate',
        topic: 'Testing'
      };
      mockPrismaService.debate.create.mockResolvedValue(mockDebate);

      // Act
      const result = await service.createDebate(userId, createDebateDto);

      // Assert
      expect(result).toEqual(mockDebate);
      expect(mockPrismaService.debate.create).toHaveBeenCalledWith({
        data: {
          title: createDebateDto.title,
          topic: createDebateDto.topic,
          createdById: userId,
          users: {
            connect: { id: userId }
          }
        },
        include: expect.any(Object)
      });
    });
  });

  describe('findDebateById', () => {
    it('should return a debate if it exists', async () => {
      // Arrange
      mockPrismaService.debate.findUnique.mockResolvedValue(mockDebate);

      // Act
      const result = await service.findDebateById('debate-id');

      // Assert
      expect(result).toEqual(mockDebate);
      expect(mockPrismaService.debate.findUnique).toHaveBeenCalledWith({
        where: { id: 'debate-id' },
        include: expect.any(Object)
      });
    });

    it('should throw NotFoundException if debate does not exist', async () => {
      // Arrange
      mockPrismaService.debate.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findDebateById('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });

  // Add more tests for other service methods...
});
