import { IsEmail, IsString, Length } from 'class-validator';

export class ConfirmationDto {
  @IsEmail() 
  email: string;

  @IsString() 
  @Length(6, 6) 
  OTBCode: string;
}
