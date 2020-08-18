import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../service/user.service';
import { NgForm } from '@angular/forms';

import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  username: string;
  email: string;
  fullname: string;
  address: string;
  phoneNumber: string;
  password: string;
  

 

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initData();

  }

  initData() {
    // poziv servisa- subscribe
    this.service.UserAccount().subscribe(
      (res: any) =>{
        this.username = res.username;
        this.email = res.email;
        this.fullname = res.fullname;
        this.address = res.address;
        this.phoneNumber = res.phone;

      },
      err => {

      }
    );
  }

  UpdateUserAccount(userForm: NgForm) {
    // poziv servisa- subscribe
  
    this.service.UpdateUser(userForm.value).subscribe(
      (res: any) => {
        this.initData();  
      },
      err => {
      }
    );
  }


}
