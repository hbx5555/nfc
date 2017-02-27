/**
 * Created by Eyal on 20/02/2017.
 */
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {NFCLoginModule} from './login/login.module';

@NgModule({
    declarations:[AppComponent],
    providers   :[],
    bootstrap   :[AppComponent],
    imports     :[
        BrowserModule,
        NFCLoginModule
    ],
    exports     :[]
})
export class AppModule{}