import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { GEOMODEL, coordsDate } from "./geo.model";

@Injectable({ providedIn: "root" })
export class GeoService {
  private myGeoData: GEOMODEL[] = coordsDate;
  newActivity = new Subject<GEOMODEL>()

  get GeoData() {
    return this.myGeoData;
  }

  setGeoData(geoData: GEOMODEL){
    this.myGeoData.push(geoData)
  }
} // class end


