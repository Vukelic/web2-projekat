import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CarCompany } from "src/app/entities/CarCompany";
import { Observable } from "rxjs";
import { Car } from "src/app/entities/Car";

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
}