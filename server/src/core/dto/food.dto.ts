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
  amount: number;


  @IsNotEmpty()
  category: any;

  @IsOptional()
  image: string;
  
  @IsOptional()
  quantity:number;
}

export class UpdateFoodDto {
  @MinLength(2)
  @MaxLength(10)
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  category: string;

  @IsOptional()
  image: string;
}
