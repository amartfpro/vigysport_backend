import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsString,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class CreateCollectionDiscountDto {
  @IsNotEmpty()
  @IsString()
  collectionId: string;

  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @IsNotEmpty()
  @IsEnum(['percentage', 'fixed'])
  discountType: string;

  @IsNotEmpty()
  @IsDate()
  validFrom: Date;

  @IsNotEmpty()
  @IsDate()
  validUntil: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateCollectionDiscountDto {
  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsEnum(['percentage', 'fixed'])
  discountType?: 'percentage' | 'fixed';

  @IsOptional()
  @IsDate()
  validFrom?: Date;

  @IsOptional()
  @IsDate()
  validUntil?: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
