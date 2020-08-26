import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarAdminService } from "src/app/service/car-admin-service";
import { CarCompany } from "src/app/entities/CarCompany";
import { ReservationCar } from "src/app/entities/ReservationCar";

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {
myReservations: ReservationCar[];
  constructor(private carAdminService: CarAdminService,
    private toastrService: ToastrService,
   private route: ActivatedRoute,
   private router: Router,
   private modalService: NgbModal) { }

  ngOnInit(): void {
    let token =localStorage.getItem('token');
     
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      this.carAdminService.GetMyReservation(decodedToken.UserID).subscribe(
      (res: any) => {
        this.myReservations = res;
        console.log(res);
      }
      );


  }

}
