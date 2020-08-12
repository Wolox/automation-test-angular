import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../mocks/orders.mock';

export const SORT_BY = {
  DATE: 'date',
  PRICE: 'price',
  LOCAL: 'local'
};

export const SORT_TYPE = {
  ASC: 'ASC',
  DESC: 'DESC'
};

export interface GetOrdersReponse {
  orders: Order[];
  pagination: {
    sortBy: string;
    sortType: string;
    total: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orders: Order[] = [];
  sortType: string = SORT_TYPE.ASC;
  sortedBy: string;

  constructor() {}

  getOrders(sortBy?: string): Observable<GetOrdersReponse> {
    if (sortBy) {
      this.sortOffer(sortBy);
    }
    const response: GetOrdersReponse = {
      orders: this.orders,
      pagination: {
        sortBy: this.sortedBy,
        sortType: this.sortType,
        total: this.getOrders.length
      }
    };
    return of(response);
  }

  addNewOrder(newOrder: Order) {
    this.orders = [...this.orders, newOrder];
  }

  sortOffer(sortBy: string): void {
    if (sortBy === this.sortedBy) {
      this.sortType = this.sortType === SORT_TYPE.ASC ? SORT_TYPE.DESC : SORT_TYPE.ASC;
    } else {
      this.sortType = SORT_TYPE.ASC;
    }
    switch (this.sortType) {
      case SORT_TYPE.ASC:
        this.sortASC(sortBy);
        break;
      case SORT_TYPE.DESC:
        this.sortDESC(sortBy);
        break;
      default:
        break;
    }
    this.sortedBy = sortBy;
  }

  sortASC(sortBy: string): void {
    if (sortBy === SORT_BY.DATE) {
      this.orders.sort((a, b) => {
        if (a[sortBy] !== b[sortBy]) {
          return new Date(a[sortBy]) < new Date(b[sortBy]) ? -1 : 1;
        }
      });
    } else {
      this.orders.sort((a, b) => {
        if (a[sortBy] !== b[sortBy]) {
          return a[sortBy] < b[sortBy] ? -1 : 1;
        }
      });
    }
  }

  sortDESC(sortBy: string): void {
    if (sortBy === SORT_BY.DATE) {
      this.orders.sort((a, b) => {
        if (a[sortBy] !== b[sortBy]) {
          return new Date(a[sortBy]) > new Date(b[sortBy]) ? -1 : 1;
        }
      });
    } else {
      this.orders.sort((a, b) => {
        if (a[sortBy] !== b[sortBy]) {
          return a[sortBy] > b[sortBy] ? -1 : 1;
        }
      });
    }
  }
}
