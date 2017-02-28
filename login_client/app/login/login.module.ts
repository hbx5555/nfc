/**
 * Created by Eyal on 20/02/2017.
 */
import {NgModule} from "@angular/core";
import {NFCLoginComponent} from "./login.component";
import {CommonModule} from "@angular/common";
import {MaterialModule } from '@angular/material';
import { FormsModule }   from '@angular/forms';

@NgModule({
    declarations:[NFCLoginComponent],
    providers   :[],
    bootstrap   :[NFCLoginComponent],
    imports     :[
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    exports     :[NFCLoginComponent]
})
export class NFCLoginModule{}