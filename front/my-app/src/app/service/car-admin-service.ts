import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CarCompany } from "src/app/entities/CarCompany";
import { Observable } from "rxjs";
import { Car } from "src/app/entities/Car";
import { ReservationCar } from "src/app/entities/ReservationCar";
import { QuickReservation } from "src/app/entities/QuickReservation";
import { CityExpositure } from 'src/app/entities/CityExpositure';
import { Rating } from "src/app/entities/Rating";
import { startWith } from 'rxjs/operators';

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

      GetAllCompaniesCarAdmin(username: string):Observable<CarCompany>{
        return this.http.get<CarCompany>(this.BaseURI + '/CarAdmin/GetAllCompaniesCarAdmin/' + username);
      }//ovo je jedna kompanija

      GetCarsOfCompany(userid: string):Observable<Car[]>{
        return this.http.get<Car[]>(this.BaseURI + "/CarAdmin/GetCarsOfCompany/" + userid);
      } //oov nije companyId nego id usera

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

      GetCarsOfCompanyAllUsers(companyId: number):Observable<Car[]>{
        return this.http.get<Car[]>(this.BaseURI + "/CarAdmin/GetCarsOfCompanyAllUsers/" + companyId);
      } 
      GetMyReservation(userid: string):Observable<ReservationCar[]>{
        return this.http.get<ReservationCar[]>(this.BaseURI + "/CarAdmin/GetMyReservations/" + userid);
      } 

      createQuickReservationCar(quickCar: QuickReservation){
        return this.http.post(this.BaseURI + "/CarAdmin/CreateQuickReservationCar", quickCar);
      }

      searchQuickReservationCar(from: string,to: string, id: string):Observable<QuickReservation[]>{
        return this.http.get<QuickReservation[]>(this.BaseURI + "/CarAdmin/SearchQuickReservationCar/" + from + "/"+ to + "/" + id);
      }

      DeleteReservation(id: string){
        return this.http.delete(this.BaseURI + "/CarAdmin/DeleteReservation/" + id );
      }
      CreateQucikReservation(quickCar: QuickReservation){
        return this.http.post(this.BaseURI + "/CarAdmin/CreateQucikReservation", quickCar);
      }
      GetMyExposituresByCar(id: number):Observable<CityExpositure[]>{
        return this.http.get<CityExpositure[]>(this.BaseURI + "/CarAdmin/GetMyExposituresByCar/" + id);
      }

      AddRating(model: Rating){
        return this.http.post(this.BaseURI + "/CarAdmin/AddRating",model);
      }

      GetReport(id: string){
        return this.http.get(this.BaseURI + "/CarAdmin/GetMyReport/" + id);
      }

      GetProfit(start: string, end: string, id: string){
        return this.http.get(this.BaseURI + "/CarAdmin/GetProfit/" + start + "/"+ end + "/" + id);
      }

      GetCompanySearch(name: string, city: string):Observable<CarCompany[]>{
        return this.http.get<CarCompany[]>(this.BaseURI + "/CarAdmin/GetCompanySearch/"+ name + "/"+ city);
      }

      SearchAvaiableCars(from: string,to: string, id: string, model: string, seats: string,price:string):Observable<Car[]>{
        return this.http.get<Car[]>(this.BaseURI + "/CarAdmin/SearchAvaiableCars/" + from + "/"+ to + "/" + id +"/" + model + "/" + seats + "/" + price);
      }
}