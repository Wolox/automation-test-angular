import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SORT_BY, SORT_TYPE } from 'src/app/services/offers.service';
import { OrdersService } from 'src/app/services/orders.service';
import { OfferModalComponent } from 'src/app/components/offer-modal/offer-modal.component';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { Order } from 'src/app/mocks/orders.mock';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  SORT_BY = SORT_BY;
  SORT_TYPE = SORT_TYPE;
  sortedBy: string;
  sortedType: string;
  orders: Order[];
  @ViewChild('offerModal', { static: false }) private offerModal: OfferModalComponent;
  @ViewChild('confirmationModal', { static: false }) private confirmationModal: ConfirmationModalComponent;

  constructor(
    private authService: AuthenticationService,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    const userLogged = this.authService.getUser();
    this.ordersService.getOrders(userLogged).subscribe(translatedValue => { 
      this.orders = translatedValue.orders;
    });
  }

  updateOrders(sortBy?: string): void {
    this.ordersService.getOrders(sortBy).subscribe(response => {
      this.orders = response.orders;
      this.sortedBy = response.pagination.sortBy;
      this.sortedType = response.pagination.sortType;
    });
  }

  resolveSortClass(sortBy) {
    return {
      active: sortBy === this.sortedBy,
      'active-desc': (sortBy === this.sortedBy && this.sortedType === SORT_TYPE.DESC)
    };
  }

}
