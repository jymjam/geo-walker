import { Component, OnInit } from "@angular/core";
import { GeoService } from "../shared/geo.service";
import { GEOMODEL } from "../shared/geo.model";
import { map } from 'rxjs/operators';

@Component({
  selector: "app-activity",
  templateUrl: "./activity.page.html",
  styleUrls: ["./activity.page.scss"],
})
export class ActivityPage implements OnInit {
  constructor(private geoService: GeoService) {}
  title = "Activities";
  geoData: GEOMODEL[];
  openModal: boolean;

  ngOnInit() {
    this.openModal = false;
    this.geoData = this.geoService.GeoData;

    this.geoService.newActivity.pipe(map(newActivity => {
        newActivity.id = this.geoData.length
        return newActivity
    })).subscribe(newactivity => {
        this.geoData.push(newactivity)
      })
  }

  newActivity() {
    this.openModal = !this.openModal;
  }
}

