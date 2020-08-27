import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { NavHeader } from './nav-header.page';

@NgModule({
    declarations:[
        NavHeader
    ],
    imports:[
        IonicModule
    ],
    exports:[
        NavHeader
    ]
})
export class SharedModule{}