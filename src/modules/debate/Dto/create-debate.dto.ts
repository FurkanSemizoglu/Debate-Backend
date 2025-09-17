import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID, IsArray } from 'class-validator';

// Define enum locally to avoid client import issues
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

export class CreateDebateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsEnum(DebateCategory)
  @IsOptional()
  category?: DebateCategory;
}
