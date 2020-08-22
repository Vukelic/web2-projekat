
import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CarCompany } from "src/app/entities/CarCompany";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'http://localhost:54183/api';
  
  formModel = this.fb.group({
    Username: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: ['',  Validators.required],
    Address: ['', Validators.required],
    Phone: ['', Validators.required],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });
  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  registerWebAdmin() {
    var body = {
      Username: this.formModel.value.Username,
      Password: this.formModel.value.Passwords.Password,
      ConfirmPassword: this.formModel.value.Passwords.ConfirmPassword,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Address: this.formModel.value.Address,
      Phone: this.formModel.value.Phone
    };
    console.log(body);
    return this.http.post(this.BaseURI + '/AppUser/RegisterWebAdmin', body);
  }

  registerCarAdmin() {
    var body = {
      Username: this.formModel.value.Username,
      Password: this.formModel.value.Passwords.Password,
      ConfirmPassword: this.formModel.value.Passwords.ConfirmPassword,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Address: this.formModel.value.Address,
      Phone: this.formModel.value.Phone
    };
    console.log(body);
    return this.http.post(this.BaseURI + '/AppUser/RegisterCarAdmin', body);
  }
  

  AddDiscount(formData) {
    console.log(formData);
      return this.http.post(this.BaseURI + '/AppUser/AddDiscount', formData);
    }
 
    LoadDiscount(){
      return this.http.get(this.BaseURI + '/AppUser/GetDiscount');
    }

    createCarCompany(company: CarCompany) {
      return this.http.post(this.BaseURI + "/AppUser/AddCarCompany", company);
    }

   
}