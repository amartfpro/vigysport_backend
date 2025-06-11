import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateDiscountDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(['product', 'collection', 'code', 'seasonal'])
  discountType: 'product' | 'collection' | 'code' | 'seasonal';

  @IsNotEmpty()
  @IsEnum(['percentage', 'fixed'])
  discountValueType: 'percentage' | 'fixed';

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

export class UpdateDiscountDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsEnum(['product', 'collection', 'code', 'seasonal'])
  discountType?: 'product' | 'collection' | 'code' | 'seasonal';

  @IsOptional()
  @IsEnum(['percentage', 'fixed'])
  discountValueType?: 'percentage' | 'fixed';

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
