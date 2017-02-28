/**
 * Created by Andrey on 2/27/2017.
 */
import {Component} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'nfc-login',
    templateUrl: './assets/login.component.html',
    styleUrls: ['./assets/login.component.css']
})
export class NFCLoginComponent{
    name:string = "NFC Login"
    uname:string = "";
    submitted: boolean = false;
    btnStatus: string = 'Sign in';

    onSubmitClicked(): void {
        this.submitted = true;
        this.btnStatus = 'Waiting to pass credit card...'
    }
}