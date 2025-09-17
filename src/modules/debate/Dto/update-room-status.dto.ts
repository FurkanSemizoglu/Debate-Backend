import { IsOptional, IsEnum } from 'class-validator';

export enum RoomStatus {
  WAITING = 'WAITING',
  LIVE = 'LIVE',
  FINISHED = 'FINISHED'
}

export class UpdateRoomStatusDto {
  @IsOptional()
  @IsEnum(RoomStatus)
  status?: RoomStatus;
}
