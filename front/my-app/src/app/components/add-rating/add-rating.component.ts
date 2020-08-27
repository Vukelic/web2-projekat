import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CarAdminService } from "src/app/service/car-admin-service";
import { ToastrService } from "ngx-toastr";
import { Rating } from "src/app/entities/Rating";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.css']
})
export class AddRatingComponent implements OnInit {
  addRatingForm: FormGroup;
  id: string;
  constructor(private route: ActivatedRoute,
    private carAdminService: CarAdminService,
    private toastrService: ToastrService) { 
      route.params.subscribe(params => { this.id = params['id']; });
      console.log(this.id);
    }

  ngOnInit(): void {
    this.load();
  }

  onSubmit() {
    const rating = new Rating(
     this.id,
      this.addRatingForm.value["ratingCar"] + "",
      this.addRatingForm.value["ratingService"] + "",
    );
      console.log(rating);

    this.carAdminService.AddRating(rating).subscribe(
      (res: any) => {
        this.addRatingForm.reset();
        this.toastrService.success(
          "Car service is created!",
          "Succesfull"
        );
      },
      err => {
        if (err.status == 400)
        this.toastrService.error('You can not enter a rating 2x!', 'AddRating failed.');
      else
        console.log(err);
      }
    );
  }

  private load() {
    let ratingCar = "";
    let ratingService = "";

    this.addRatingForm = new FormGroup({
      ratingCar: new FormControl(ratingCar, Validators.required),
      ratingService: new FormControl(ratingService, Validators.required)
    });
  }

}
