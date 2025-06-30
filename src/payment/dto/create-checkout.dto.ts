import { IsEmail } from 'class-validator';

export class CreateCheckoutDTO {
  @IsEmail()
  email: string;
}
