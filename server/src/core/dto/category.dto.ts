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
  name: object;

  @IsOptional()
  description: object;
  @IsOptional()
   image:string;

}

export class UpdateCategoryDto {
  @MinLength(2)
  @MaxLength(10)
  @IsOptional()
  name: object;

  @IsOptional()
  description: object;
  @IsOptional()
image:string;


}
