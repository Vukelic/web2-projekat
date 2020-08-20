import { Car } from "./Car";
import { User } from "./User";

export class CarCompany {
  constructor(
    public id: string,
    public name: string,
    public rating: string, 
    public description: string,
    public address: string, 
    public cityexpositure: string,
    public imagepic: string,
    public cars: string,
    public cadmin: string = null
  ) {}
}