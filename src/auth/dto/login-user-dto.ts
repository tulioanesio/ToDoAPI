import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({
    description: 'Registered email address',
    example: 'user@example.com',
    type: String,
    required: true,
    format: 'email',
    maxLength: 255,
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Must be a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Account password',
    example: 'SecurePassword123!',
    type: String,
    required: true,
    minLength: 6,
    maxLength: 128,
    pattern:
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$',
  })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Length(6, 128, { message: 'Password must be between 6 and 128 characters' })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {})
  password: string;
}
