import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-nav-header',
    template: `
    <ion-header [translucent]="true">
        <ion-toolbar>
            <ion-title>
                {{navTitle}}
            </ion-title>
        </ion-toolbar>
    </ion-header>
    `
})
export class NavHeader{
    @Input() navTitle: string = "<error setting title>"
}