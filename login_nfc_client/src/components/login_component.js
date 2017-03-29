/**
 * Created by andreyna on 3/28/2017.
 */

let loginView = require('./view/login_dialog.html');
import $ from "jquery";
import {errors} from '../config';
import LoginManager from '../services/login_manager';

class LoginComponent {

    _identifier;
    _ping;

    start(container, status) {
        $(container).append(loginView);
        if (status === errors.COMMUNICATION_FAILED) {
            $('.kcl-login-content-error').toggleClass('hide');
        } else {
            $('.kcl-login-content').toggleClass('hide');
            this._getIdentifier();
        }
        //this._subscribeUserEvents();


    }


    _subscribeUserEvents() {
        $('#testBtn').on('click', () => {
           this._getIdentifier();
        });
    }

    _getIdentifier() {
        debugger;
        $('#preloader').toggleClass('hide');
        LoginManager.instance.getIdentifier()
            .then((res) => {
                this._identifier = res;
                $('#resultTest').text(res);
            })
            .catch((error) => {
                debugger;
                $('#preloader').toggleClass('hide');
                this._displayPIN()
            });
    }

    _displayPIN() {
        console.log('LoginComponent - no token exists, start to display PIN');
        $('#pinContainer').toggleClass('hide');
        let inputs = $('#pinContainer input');
        let pin = LoginManager.instance.getPIN();
        LoginManager.instance.sendRequest();
        this._pinPresenter = {
            inputs: inputs,
            pin: pin,
            index: 0
        };

        this._pinInterval = setInterval(() => {
            let i = this._pinPresenter.index;
            if (i >= this._pinPresenter.pin.length) {
                clearInterval(this._pinInterval);
                return;
            }
            this._pinPresenter.inputs[i].value = this._pinPresenter.pin[i];
            this._pinPresenter.index++;

        }, 500);
    }
}

export default LoginComponent;