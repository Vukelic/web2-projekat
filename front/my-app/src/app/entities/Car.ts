export class Car {
    constructor(
      public id: number,
      public description: string,
      public modelofcar: string,
      public typeofcar: number,
      public numberofseats: number, //passengers
      public price: number,
      public rating: number,
      public imagepic: string,
      public nameOfcompany: string,
      public isReserved: boolean
    ) {}
  }