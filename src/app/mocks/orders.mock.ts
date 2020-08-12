export interface Order {
  readonly id: string;
  date: string;
  price: number;
  description: string;
  shipping_cost: number;
  local: string;
  address: string;
}
