import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CarCompany } from "src/app/entities/CarCompany";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarAdminService {
    constructor(private fb: FormBuilder, private http: HttpClient) { }
    readonly BaseURI = 'http://localhost:54183/api';

    GetAllCompanies():Observable<CarCompany[]>{
        return this.http.get<CarCompany[]>(this.BaseURI + '/CarAdmin/GetAllCompanies');
      }
}