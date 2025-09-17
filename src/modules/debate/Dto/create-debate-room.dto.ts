import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDebateRoomDto {
  @IsNotEmpty()
  @IsString()
  debateId: string;
}
