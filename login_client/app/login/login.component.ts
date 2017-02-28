/**
 * Created by Andrey on 2/27/2017.
 */
import {Component} from "@angular/core";
import {LoginService, Message} from './login.service';

@Component({
    moduleId: module.id,
    selector: 'nfc-login',
    templateUrl: './assets/login.component.html',
    styleUrls: ['./assets/login.component.css'],
    providers: [LoginService]
})
export class NFCLoginComponent{
    name:string = "NFC Login"
    uname:string = "";
    submitted: boolean = false;
    passed: boolean = false;
    loginResponse;

    constructor(private loginService: LoginService) {
        this.loginService.messages.subscribe(msg => {
            console.log(JSON.stringify(msg));
           this.loginResponse = msg;
        });
    }
    onSubmitClicked(): void {
        this.loginService.messages.next({author:'Nago', message: this.uname});
        this.submitted = true;
    }
}