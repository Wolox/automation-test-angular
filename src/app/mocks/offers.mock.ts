import * as moment from 'moment';

export interface Offer {
  readonly id: string;
  date: string;
  price: number;
  description: string;
  shipping_cost: number;
  local: string;
  address: string;
}

const today: string = moment().format("YYYY-MM-DD");

export const OFFERS: Offer[] = [
  {
    id: 'axKl',
    date: today,
    price: 20000,
    description: 'Aceite de Girasol',
    shipping_cost: 2000,
    local: 'Premier',
    address: 'Tr. 13 #12-34'
  }, {
    id: 'Sfdu',
    date: today,
    price: 3500,
    description: 'Pan tajado',
    shipping_cost: 500,
    local: 'La Panadería',
    address: 'Tr. 13 #12-34'
  }, {
    id: 'SDcv',
    date: today,
    price: 14000,
    description: 'Jamón Premium',
    shipping_cost: 1000,
    local: 'Casa Rancho',
    address: 'Calle 10 #12A-34'
  }
];
