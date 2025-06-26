import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: "^[a-zA-Z \\-']+$",
  })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  @Matches(/^[a-zA-Z \-\']+$/, {
    message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
  })
  name: string;

  @ApiProperty({
    description: 'Email address for account registration',
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
    minLength: 8,
    maxLength: 128,
    pattern:
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
  })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Length(8, 128, { message: 'Password must be between 8 and 128 characters' })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;
}
