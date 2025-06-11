import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class CreateProductDiscountDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @IsNotEmpty()
  @IsEnum(['percentage', 'fixed'])
  discountType: string;

  @IsNotEmpty()
  @IsDateString()
  validFrom: Date;

  @IsNotEmpty()
  @IsDateString()
  validUntil: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateProductDiscountDto {
  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsEnum(['percentage', 'fixed'])
  discountType?: 'percentage' | 'fixed';

  @IsOptional()
  @IsDateString()
  validFrom?: Date;

  @IsOptional()
  @IsDateString()
  validUntil?: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
