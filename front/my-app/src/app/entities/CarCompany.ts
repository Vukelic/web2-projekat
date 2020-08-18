import { Car } from "./Car";
import { User } from "./User";

export class CarCompany {
  constructor(
    public id: number,
    public name: string,
    public rating: number, //prosecna ocena
    public description: string,
    public address: string, //zemlja
    public cityexpositure: string,
    public imagepic: string,
    public cars: string,
    public cadmin: string = null
  ) {}
}