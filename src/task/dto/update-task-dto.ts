import { IsOptional, IsString, IsBoolean, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDTO {
  @ApiPropertyOptional({
    description: 'Updated title or description of the task',
    example: 'Wash and dry all dishes',
    type: String,
    minLength: 3,
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Task description must be a string' })
  @Length(3, 255, {
    message: 'Task description must be between 3 and 255 characters long',
  })
  task?: string;

  @ApiPropertyOptional({
    description: 'Updated completion status of the task',
    example: true,
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isDone must be a boolean value' })
  isDone?: boolean;
}
