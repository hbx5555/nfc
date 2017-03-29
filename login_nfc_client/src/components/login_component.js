/**
 * Created by andreyna on 3/28/2017.
 */

let loginView = require('./view/login_dialog.html');
import $ from "jquery";
import LoginManager from '../services/login_manager';

class LoginComponent {

    _identifier;
    _ping;

    start(container) {
        $(container).append(loginView);
        this._subscribeUserEvents();
        this._getIdentifier();

    }


    _subscribeUserEvents() {
        $('#testBtn').on('click', () => {
           this._getIdentifier();
        });
    }

    _getIdentifier() {
        $('#preloader').toggleClass('hide');
        LoginManager.instance.getIdentifier()
            .then((res) => {
                this._identifier = res;
                $('#resultTest').text(res);
            })
            .catch(() => {
                $('#preloader').toggleClass('hide');
                this._displayPIN()
            });
    }

    _displayPIN() {
        console.log('LoginComponent - no token exists, start to display PIN');
        $('#pinContainer').toggleClass('hide');
        let inputs = $('#pinContainer input');
        let pin = LoginManager.instance.getPIN();
        this._pinPresenter = {
            inputs: inputs,
            pin: pin,
            index: 0
        };

        this._pinInterval = setInterval(() => {
            let i = this._pinPresenter.index;
            if (i >= this._pinPresenter.pin.length) {
                clearInterval(this._pinInterval);
            }
            this._pinPresenter.inputs[i].value = this._pinPresenter.pin[i];
            this._pinPresenter.index++;

        }, 500);
    }
}

export default LoginComponent;