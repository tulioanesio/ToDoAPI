import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  task: string;

  @IsOptional()
  isDone?: boolean;
}
