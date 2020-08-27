
export class ReservationCar {
    constructor(
      public Id: string,
      public pickUpLocation: string,
      public returnLocation: string, 
      public pickUpTime: string,
      public returnTime: string, 
      public startDate: string,
      public endDate: string,
      public babySeat: string,
      public navigation: string,
      public totalPrice: string,
      public user: string,
      public car: string,
      public carImg: string,
      public rating: string
    ) {}
  }