import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDTO {
  @ApiProperty({
    description: 'The title or description of the task to be created',
    example: 'Complete project documentation',
    required: true,
    maxLength: 255,
    type: String,
  })
  @IsNotEmpty({
    message: 'Task description cannot be empty',
  })
  task: string;

  @ApiProperty({
    description: 'Completion status of the task',
    example: false,
    required: false,
    default: false,
    type: Boolean,
  })
  @IsOptional()
  isDone?: boolean;
}
