import { Test, TestingModule } from '@nestjs/testing';
import { DebateController } from '../debate.controller';
import { DebateService } from '../debate.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateDebateDto } from '../Dto/create-debate.dto';
import { UpdateDebateDto } from '../Dto/update-debate.dto';

const mockPrismaService = {
  debate: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
};

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
  decode: jest.fn(),
};

describe('DebateController', () => {
  let controller: DebateController;
  let service: DebateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebateController],
      providers: [
        DebateService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    controller = module.get<DebateController>(DebateController);
    service = module.get<DebateService>(DebateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new debate', async () => {
      const createDebateDto: CreateDebateDto = {
        title: 'Test Debate',
        topic: 'Testing'
      };
      const mockRequest = { user: { sub: 'user-id' } };
      const expectedResult = { id: 'debate-id', ...createDebateDto, createdById: 'user-id' };
      
      jest.spyOn(service, 'createDebate').mockResolvedValue(expectedResult as any);
      
      const result = await controller.create(mockRequest, createDebateDto);
      
      expect(result).toBe(expectedResult);
      expect(service.createDebate).toHaveBeenCalledWith('user-id', createDebateDto);
    });
  });
});
