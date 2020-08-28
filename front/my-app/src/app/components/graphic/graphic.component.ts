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
  checkIncome: FormGroup;
  one:string;
  two:string;
  three:string;
  num1: number;
  num2: number;
  num3:number;
  to: string; 
  from: string;
  myNum: string;
  profit: number;
  
  public chartType: string = 'line';
  public chartDatasets: Array<any> = [
    { data: [1,2,3], label: 'Reservations' }
  ];
  public chartDatasets2: Array<any> = [
    { data: [1], label: 'Profit' }
  ];

  public chartLabels: Array<any> = ['This day', 'This week', 'This month'];
  public chartLabels2: Array<any> = ['Choose date'];
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
    this.load();
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
        this.one = res.first;
        this.two= res.second;
        this.three = res.third;
        this.num1 = parseInt(this.one);
        this.num2 = parseInt(this.two);
       this.num3 = parseInt(this.three);
       this.chartDatasets[0].data = [this.num1, this.num2, this.num3];
       this.chartLabels = ['15-08', '16.08-22.08', '1.08-31.08'];
      },
      err=>{
        this.toastrService.error("Error with charts!", "Charts error!");
        console.log(err);
      });   
  }

  onSubmit()
  {
    this.to =  this.checkIncome.value["startDate"];
    this.from =  this.checkIncome.value["endDate"];
  this.carAdminService.GetProfit(this.to, this.from, this.userId).subscribe((res: any) => {
    this.myNum = res;
     this.profit =  parseInt(this.myNum);
     this.chartDatasets2[0].data = [this.profit];
     this.chartLabels2= [this.to, this.from];
     this.checkIncome.reset();
   });
  }

  private load() {
    let startDate = "";
    let endDate = "";

  
    this.checkIncome = new FormGroup({
      startDate: new FormControl(startDate, Validators.required),
      endDate: new FormControl(endDate, Validators.required)
    });
  }

  
 
}
