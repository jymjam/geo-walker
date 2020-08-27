import { Component, Output, EventEmitter } from "@angular/core";
import { GeoService } from "../shared/geo.service";

@Component({
  selector: "app-activity-modal",
  template: `
    <div class="backdrop" (click)="closeModal()"></div>
    <ion-content class="modal-content">
      <form class="activity" #form="ngForm">
        <ion-item>
          <ion-label>Date</ion-label>
          <ion-input type="date" ngModel name="date"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Comments</ion-label>
          <ion-input ngModel name="comments"></ion-input>
        </ion-item>
        <ion-button (click)="commitActivity(form.value)" color="danger"
          >Commit</ion-button
        >
      </form>
    </ion-content>
  `,
  styles: [
    `
      .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.75);
        z-index: 50;
      }
      .modal-content {
        position: fixed;
        top: 30vh;
        left: 20vw;
        width: 50vw;
        height: 50vh;
        padding: 16px;
        box-shadow: 0 2px 2px #b9b9b9;
        z-index: 100;
      }
    `,
  ],
})
export class ActivityModal {
  @Output() close = new EventEmitter<boolean>();

  constructor(private geoService: GeoService) {}
  closeModal() {
    this.close.emit(false);
  }

  commitActivity(formValue: JSON) {
    let newActivity = {
      id: 0,
      date: formValue["date"],
      comments: formValue["comments"],
      geo: {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: { type: "LineString", coordinates: [] },
        },
      },
    };
    this.geoService.newActivity.next(newActivity)
    this.close.emit(false); //closes  the modal
  }
}
