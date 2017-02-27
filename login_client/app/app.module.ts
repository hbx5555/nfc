/**
 * Created by Eyal on 20/02/2017.
 */
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {MaterialModule } from '@angular/material';
import {NFCLoginModule} from './login/login.module';

@NgModule({
    declarations:[AppComponent],
    providers   :[],
    bootstrap   :[AppComponent],
    imports     :[
        BrowserModule,
        NFCLoginModule,
        MaterialModule
    ],
    exports     :[]
})
export class AppModule{}