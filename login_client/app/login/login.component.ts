/**
 * Created by Andrey on 2/27/2017.
 */
import {Component} from "@angular/core";

@Component({
    selector: 'nfc-login',
    template : `
    <div>
        <h1>Hello {{name}}</h1>  
    </div>
`})
export class NFCLoginComponent{
    name:string = "NFC Login"

}