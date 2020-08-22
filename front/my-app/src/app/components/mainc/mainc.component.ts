import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarAdminService } from "src/app/service/car-admin-service";
import { CarCompany } from "src/app/entities/CarCompany";

@Component({
  selector: 'app-mainc',
  templateUrl: './mainc.component.html',
  styleUrls: ['./mainc.component.css']
})
export class MaincComponent implements OnInit {
  namecopmany: CarCompany[];
  constructor(private carAdminService: CarAdminService,
     private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.carAdminService
    .GetAllCompanies()
    .subscribe(
      (res: any) => {
        this.namecopmany = res;
        console.log(this.namecopmany);
      }
      );
  }

  onClick( c){
  //  this.router.navigate(['/caradmin/' + c.id + '/details']);
}

}
