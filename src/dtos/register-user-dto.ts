import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6)
  password: string;
}
