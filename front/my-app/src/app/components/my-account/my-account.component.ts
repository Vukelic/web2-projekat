import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../service/user.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  Username: string;
  Email: string;
  Fullname: string;
  Address: string;
  PhoneNumber: string;
  userForm: FormGroup;
 

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initData();

  }

  initData() {
    // poziv servisa- subscribe
    this.service.UserAccount().subscribe(
      (res: any) =>{
      
        this.Username = res.username;
        this.Email = res.email;
        this.Fullname = res.fullname;
        this.Address = res.address;
        this.PhoneNumber = res.phone;

      },
      err => {

      }
    );
  }



}
