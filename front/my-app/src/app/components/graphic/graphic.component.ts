import { Component, OnInit } from '@angular/core';
import { CarCompany } from "src/app/entities/CarCompany";
import { Charts } from "src/app/entities/Charts";
import { CarAdminService } from "src/app/service/car-admin-service";
import { ToastrService } from "ngx-toastr";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ChartsModule, WavesModule, CarouselModule } from 'angular-bootstrap-md';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {
  userId: string;
  report: Charts;

  one:string;
  two:string;
  three:string;
  num1: number;
  num2: number;
  num3:number;
  
  public chartType: string = 'line';
  public chartDatasets: Array<any> = [
    { data: [1,2,3], label: 'Reservations' }
  ];

  public chartLabels: Array<any> = ['This day', 'This week', 'This month'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 2
    },
  ];

  public chartOptions: any = {
    responsive: true
  };
  
  constructor(private carAdminService: CarAdminService,private toastrService: ToastrService) {}

  ngOnInit(): void {
    let token =localStorage.getItem('token');

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken.UserID);
    this.userId = decodedToken.UserID;

    this.carAdminService
    .GetReport(this.userId)
    .subscribe(
      (res: any) => {
        this.report = res;
        console.log(this.report);
        this.one = res.first;
        this.two= res.second;
        this.three = res.third;
        console.log(this.one);
        this.num1 = parseInt(this.one);
        this.num2 = parseInt(this.two);
       this.num3 = parseInt(this.three);
       console.log(this.num1);
       this.chartDatasets[0].data = [this.num1, this.num2, this.num3];
       console.log(this.chartDatasets[0].data);
      },
      err=>{
        this.toastrService.error("Error with charts!", "Charts error!");
        console.log(err);
      });   
  }
  klik()
  {
    this.chartDatasets[0].data = [this.num1, this.num2, this.num3];
    this.chartLabels = ['15-08', '16.08-22.08', '1.08-31.08'];
    console.log(this.chartDatasets[0].data);
  }

  
 
}
