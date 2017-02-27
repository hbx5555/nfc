/**
 * Created by Eyal on 20/02/2017.
 */
import {NgModule} from "@angular/core";
import {NFCLoginComponent} from "./login.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations:[NFCLoginComponent],
    providers   :[],
    bootstrap   :[NFCLoginComponent],
    imports     :[
        CommonModule
    ],
    exports     :[NFCLoginComponent]
})
export class NFCLoginModule{}