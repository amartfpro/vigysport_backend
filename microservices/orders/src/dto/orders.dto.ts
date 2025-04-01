export class CreateOrderDto {
  userId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status: string;
}

export class UpdateOrderDto {
  status?: string;
}
