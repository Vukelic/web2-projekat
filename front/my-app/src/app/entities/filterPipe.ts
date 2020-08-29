import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { CarCompany } from "src/app/entities/CarCompany";

@Pipe({
  name: 'filter'
})
@Injectable()
export class filterPipe implements PipeTransform {
  transform(namecopmany: CarCompany[], search: string) {
    if (!namecopmany) {
        return [];
      }

    if ( !namecopmany || !search) {
      return namecopmany;
    }

    return namecopmany.filter(c =>
        c.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  }
}