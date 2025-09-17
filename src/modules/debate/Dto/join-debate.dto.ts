import { IsUUID, IsNotEmpty } from 'class-validator';

export class JoinDebateDto {
  @IsUUID()
  @IsNotEmpty()
  debateId: string;
}
