import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CarCompany } from "src/app/entities/CarCompany";
import { Observable } from "rxjs";
import { Car } from "src/app/entities/Car";
import { ReservationCar } from "src/app/entities/ReservationCar";

@Injectable({
  providedIn: 'root'
})
export class CarAdminService {
    constructor(private fb: FormBuilder, private http: HttpClient) { }
    readonly BaseURI = 'http://localhost:54183/api';

    GetAllCompanies():Observable<CarCompany[]>{
        return this.http.get<CarCompany[]>(this.BaseURI + '/CarAdmin/GetAllCompanies');
      }

      CreateCar(car: Car) {
        return this.http.post(this.BaseURI + "/CarAdmin/AddCar", car);
      }

      GetAllCompaniesCarAdmin(username: string):Observable<CarCompany[]>{
        return this.http.get<CarCompany[]>(this.BaseURI + '/CarAdmin/GetAllCompaniesCarAdmin/' + username);
      }

      GetCarsOfCompany(companyId: number) {
        return this.http.get<Car[]>(
          this.BaseURI + "/CarAdmin/GetCarsOfCompany/" + companyId
        );
      }

      DeleteCar(id: number){
        return this.http.delete(
          this.BaseURI + "/CarAdmin/DeleteCarr/" + id
        );
      }

      UpdateCar(car: Car) {
        return this.http.put(this.BaseURI + "/CarAdmin/CarUpdate", car);
      }

      GetCompany(companyId: number) {
        return this.http.get(
          this.BaseURI + "/CarAdmin/GetCompany/" + companyId
        );
      }

      updateCarCompany(company: CarCompany) {
        return this.http.put(this.BaseURI + "/CarAdmin/UpdateCarCompany", company);
      }

      getCar(id: number){
        return this.http.get(
          this.BaseURI + "/CarAdmin/GetCar/" + id
        );
      }

      createReservationCar(reservationCar: ReservationCar){
        return this.http.post(this.BaseURI + "/CarAdmin/CreateReservationCar", reservationCar);
      }

      
}