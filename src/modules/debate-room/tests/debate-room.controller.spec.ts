import { Test, TestingModule } from '@nestjs/testing';
import { DebateRoomController } from '../debate-room.controller';
import { DebateRoomService } from '../debate-room.service';

describe('DebateRoomController', () => {
  let controller: DebateRoomController;
  let service: jest.Mocked<DebateRoomService>;

  beforeEach(async () => {
    const mockDebateRoomService = {
      createDebateRoom: jest.fn(),
      joinDebateRoom: jest.fn(),
      leaveDebateRoom: jest.fn(),
      getDebateRooms: jest.fn(),
      getRoomById: jest.fn(),
      getRoomWithDetails: jest.fn(),
      getAllRoomsWithDetails: jest.fn(),
      updateRoomStatus: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebateRoomController],
      providers: [
        { provide: DebateRoomService, useValue: mockDebateRoomService },
      ],
    }).compile();

    controller = module.get<DebateRoomController>(DebateRoomController);
    service = module.get(DebateRoomService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more specific tests here
  describe('createRoom', () => {
    it('should create a room successfully', async () => {
      // Implementation here
    });
  });

  describe('joinRoom', () => {
    it('should join a room successfully', async () => {
      // Implementation here
    });
  });
});