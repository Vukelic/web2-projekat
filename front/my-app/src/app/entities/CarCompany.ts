import { Car } from "./Car";
import { User } from "./User";

export class CarCompany {
  constructor(
    public id: number,
    public name: string,
    public rating: number, 
    public description: string,
    public address: string, 
    public cityexpositure: string,
    public imagepic: string,
    public cars: string,
    public cadmin: string = null
  ) {}
}