import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateCategoryDto {
  @MinLength(2)
  @MaxLength(10)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsString()
  image: string;

}

export class UpdateCategoryDto {
  @MinLength(2)
  @MaxLength(10)
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;
  @IsOptional()
  image: string;

}
