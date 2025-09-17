import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID, IsArray } from 'class-validator';
import { CreateDebateDto } from './create-debate.dto';
import { PartialType } from '@nestjs/mapped-types';

// Import enum from the schema directly to avoid client import issues
enum DebateStatus {
  PENDING = 'PENDING',
  LIVE = 'LIVE',
  FINISHED = 'FINISHED'
}

enum DebateCategory {
  GENERAL = 'GENERAL',
  POLITICS = 'POLITICS',
  TECHNOLOGY = 'TECHNOLOGY',
  SCIENCE = 'SCIENCE',
  SPORTS = 'SPORTS',
  ENTERTAINMENT = 'ENTERTAINMENT',
  EDUCATION = 'EDUCATION',
  HEALTH = 'HEALTH',
  ENVIRONMENT = 'ENVIRONMENT',
  BUSINESS = 'BUSINESS',
  PHILOSOPHY = 'PHILOSOPHY',
  SOCIAL_ISSUES = 'SOCIAL_ISSUES'
}

export class UpdateDebateDto extends PartialType(CreateDebateDto) {
  @IsEnum(DebateStatus)
  @IsOptional()
  status?: DebateStatus;

  @IsEnum(DebateCategory)
  @IsOptional()
  category?: DebateCategory;
}
