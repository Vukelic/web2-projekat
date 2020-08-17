import { AdminService } from './../../service/admin-service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-web-admin',
  templateUrl: './web-admin.component.html',
  styleUrls: ['./web-admin.component.css']
})
export class WebAdminComponent implements OnInit {
  discountS: string;
  discountG: string;
  discountAR: string;

  constructor(public service: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
    this.initData();
  }

  initData() {
    // poziv servisa- subscribe
    this.service.LoadDiscount().subscribe(
      (res: any) =>{
        console.log(res);
        this.discountAR = res.rentAirD;
        this.discountG = res.goldD;
        this.discountS = res.silverD;
      },
      err => {

      }
    );
  }

  onSubmit() {
    this.service.registerWebAdmin().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful.');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration failed.');
                break;

              default:
              this.toastr.error(element.description,'Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
    }
    onSubmit2() {
      this.service.registerCarAdmin().subscribe(
        (res: any) => {
          if (res.succeeded) {
            this.service.formModel.reset();
            this.toastr.success('New user created!', 'Registration successful.');
          } else {
            res.errors.forEach(element => {
              switch (element.code) {
                case 'DuplicateUserName':
                  this.toastr.error('Username is already taken','Registration failed.');
                  break;
  
                default:
                this.toastr.error(element.description,'Registration failed.');
                  break;
              }
            });
          }
        },
        err => {
          console.log(err);
        }
      );
      }


      onSubmit3(profileForm: NgForm) {
        this.service.AddDiscount(profileForm.value).subscribe(
          (res: any) => {
            this.initData();
          },
          err => {
            console.log(err);
          }
        );
  
        }
}
