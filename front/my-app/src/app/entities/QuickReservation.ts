export class QuickReservation {
    constructor(
      public Id: string,
      public startDate: string,
      public endDate: string,
      public car: string,
      public CarPic: string,
      public priceWithDiscount: string,
      public totalPrice:string,
      public userId: string
    ) {}
  }