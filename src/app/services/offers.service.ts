import { Injectable } from '@angular/core';
import { Offer, OFFERS } from 'src/app/mocks/offers.mock';
import { Observable, of } from 'rxjs';

export const SORT_BY = {
  DATE: 'date',
  PRICE: 'price',
  LOCAL: 'local'
};

export const SORT_TYPE = {
  ASC: 'ASC',
  DESC: 'DESC'
};

export interface GetOffersReponse {
  offers: Offer[];
  pagination: {
    sortBy: string;
    sortType: string;
    total: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  offers: Offer[];
  sortType: string = SORT_TYPE.ASC;
  sortedBy: string;

  constructor() {
    this.offers = OFFERS;
  }

  getOffers(sortBy?: string): Observable<GetOffersReponse> {
    if (sortBy) {
      this.sortOffer(sortBy);
    }
    const response: GetOffersReponse = {
      offers: this.offers,
      pagination: {
        sortBy: this.sortedBy,
        sortType: this.sortType,
        total: this.getOffers.length
      }
    };
    return of(response);
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
      this.offers.sort((a, b) => {
        if (a[sortBy] !== b[sortBy]) {
          return new Date(a[sortBy]) < new Date(b[sortBy]) ? -1 : 1;
        }
      });
    } else {
      this.offers.sort((a, b) => {
        if (a[sortBy] !== b[sortBy]) {
          return a[sortBy] < b[sortBy] ? -1 : 1;
        }
      });
    }
  }

  sortDESC(sortBy: string): void {
    if (sortBy === SORT_BY.DATE) {
      this.offers.sort((a, b) => {
        if (a[sortBy] !== b[sortBy]) {
          return new Date(a[sortBy]) > new Date(b[sortBy]) ? -1 : 1;
        }
      });
    } else {
      this.offers.sort((a, b) => {
        if (a[sortBy] !== b[sortBy]) {
          return a[sortBy] > b[sortBy] ? -1 : 1;
        }
      });
    }
  }
}
