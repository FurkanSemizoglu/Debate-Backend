import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export enum ParticipantRole {
  PROPOSER = 'PROPOSER',   // fikri savunan
  OPPONENT = 'OPPONENT',   // fikri reddeden
  AUDIENCE = 'AUDIENCE'    // izleyici
}

export class JoinRoomDto {
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsEnum(ParticipantRole)
  role: ParticipantRole;
}
