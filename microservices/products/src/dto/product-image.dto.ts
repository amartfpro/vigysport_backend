import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateProductImageDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsString()
  altText?: string;
}

export class UpdateProductImageDto {
  @IsOptional()
  @IsString()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  altText?: string;
}
