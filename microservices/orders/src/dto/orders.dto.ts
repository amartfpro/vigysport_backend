import {
  IsUUID,
  IsNotEmpty,
  IsInt,
  IsPositive,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  totalPrice: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}

export class UpdateOrderDto {
  @IsString()
  status?: string;
}
