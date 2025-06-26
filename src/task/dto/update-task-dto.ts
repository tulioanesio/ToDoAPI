import { IsOptional } from 'class-validator';

export class UpdateTaskDTO {
  @IsOptional()
  task?: string;

  @IsOptional()
  isDone?: boolean;
}
