import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "src/app/entities/User";
import { CarCompany } from "src/app/entities/CarCompany";

@Injectable({
  providedIn: 'root'
})
export class UserService {

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


  userForm = this.fb.group({
    Username: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: ['',  Validators.required],
    Address: ['', Validators.required],
    PhoneNumber: ['', Validators.required],
    Password: ['', [Validators.required, Validators.minLength(6)]],
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

  register() {
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
    return this.http.post(this.BaseURI + '/AppUser/Register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/AppUser/Login', formData);
  }
  socialLogIn(model){
    return this.http.post(this.BaseURI + '/AppUser/SocialLogIn', model);
}

UserAccount(){
  return this.http.get(this.BaseURI + '/AppUser/UserAccount');
}

UpdateUser(formData){
  return this.http.put(this.BaseURI + '/AppUser/PutUser', formData);
}

getAllCarAdmins():Observable<User[]> {
  return this.http.get<User[]>(this.BaseURI + "/AppUser/Getallcaradmins");
}

changePasswordFirstLogin(body){
  return this.http.post(this.BaseURI + "/AppUser/ChangePasswordFirstLogin", body);
}



 

 
}
