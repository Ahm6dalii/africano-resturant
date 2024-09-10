import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class signUpDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    name: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    OTBCode: string
    @IsString()
    @IsOptional()
    address: string;
    @IsString()
    phone: string;
}

export class signInDto {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}