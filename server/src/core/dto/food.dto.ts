import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateFoodDto {
  @MinLength(2)
  @MaxLength(10)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;


  @IsNotEmpty()
  category: any;

  @IsOptional()
  image: string;
}

export class UpdateFoodDto {
  @MinLength(2)
  @MaxLength(10)
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  price: number;

  @IsOptional()
  category: string;

  @IsOptional()
  image: string;
}
