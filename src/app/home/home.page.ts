import { Component, OnInit, OnDestroy } from "@angular/core";
import * as mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import { environment } from "src/environments/environment";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { GEOMODEL } from "../shared/geo.model";
import { GeoService } from "../shared/geo.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy{
  constructor(
    private geoService: GeoService,
    private geolocation: Geolocation,
    private aRoute: ActivatedRoute
  ) {
    mapboxgl.accessToken = environment.MAPBOX_TOKEN;
  }
  private trackUserLoc: boolean 
  private mapPathToShow: number
  private subscription: Subscription
  navTitle: string = 'Maps'
  map: mapboxgl.Map;
  geoData: GEOMODEL[];
  CoordinatesArray = []

  ngOnInit() {
    this.trackUserLoc = false
    this.initMap();
    this.geoLine();
    this.geoData = this.geoService.GeoData; // dummy service data
    this.mapPathToShow = this.aRoute.snapshot.params['id']
  }

  // creates a map
  initMap() {
    this.map = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/mapbox/streets-v9",
      zoom: 13,
      center: [55.265822410583496, 25.21507520206438], // default loc
    });
  }
  // draws path highlight
  geoLine() {
    this.map.on("load", () => {
      this.map.addSource("route", this.geoData[this.mapPathToShow].geo);
      this.map.addLayer(geoLinestyle);
    });
  }
  

  trackUser() {
    this.trackUserLoc = !this.trackUserLoc
    if(this.trackUserLoc === true){
      let watch = this.geolocation.watchPosition();
      this.subscription = watch.pipe(map(data => {
      let coords = []
      coords.push(data['coords'].longitude, data['coords'].latitude)
      return coords
      })).subscribe(resData => {
        this.CoordinatesArray.push(resData)
          console.log(this.CoordinatesArray);
      }, (err) => {
        // when permission denied
          console.error('An error occured!');
          this.trackUserLoc = !this.trackUserLoc
          return;
      })
    }else{
      this.subscription.unsubscribe()
      this.geoData[this.mapPathToShow].geo.data.geometry.coordinates.push(...this.CoordinatesArray)
      console.log(this.geoData[this.mapPathToShow]);
      return
    }
      
      
  }

  ngOnDestroy(){

  }

} // class end

const geoLinestyle = {
  id: "route",
  type: "line",
  source: "route",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "#888",
    "line-width": 5,
  },
};
