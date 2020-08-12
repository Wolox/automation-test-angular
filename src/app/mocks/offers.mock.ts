export interface Offer {
  readonly id: string;
  date: string;
  price: number;
  description: string;
  shipping_cost: number;
  local: string;
  address: string;
}

export const OFFERS: Offer[] = [
  {
    id: 'axKl',
    date: '2019-08-15',
    price: 20000,
    description: 'Aceite de Girasol',
    shipping_cost: 2000,
    local: 'Premier',
    address: 'Tr. 13 #12-34'
  }, {
    id: 'Sfdu',
    date: '2019-11-31',
    price: 3500,
    description: 'Pan tajado',
    shipping_cost: 500,
    local: 'La Panadería',
    address: 'Tr. 13 #12-34'
  }, {
    id: 'SDcv',
    date: '2019-10-10',
    price: 14000,
    description: 'Jamón Premium',
    shipping_cost: 1000,
    local: 'Casa Rancho',
    address: 'Calle 10 #12A-34'
  }
];
