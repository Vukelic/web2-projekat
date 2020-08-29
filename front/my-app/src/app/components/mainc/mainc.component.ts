import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarAdminService } from "src/app/service/car-admin-service";
import { CarCompany } from "src/app/entities/CarCompany";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-mainc',
  templateUrl: './mainc.component.html',
  styleUrls: ['./mainc.component.css']
})
export class MaincComponent implements OnInit {
  namecopmany: CarCompany[];
  name: string;
  city: string;
  search: string;
  constructor(private carAdminService: CarAdminService,
     private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) { 

    }

  ngOnInit(): void {
    this.initData();
   
  }

  onClick( c){
    this.router.navigate(['/mainc/' + c.id + '/cars']);
}

  initData(){
    this.carAdminService
    .GetAllCompanies()
    .subscribe(
      (res: any) => {
        this.namecopmany = res;
        console.log(this.namecopmany);
      }
      );
  }
}
