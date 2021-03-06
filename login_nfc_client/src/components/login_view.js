/**
 * Created by andreyna on 4/3/2017.
 */
let loginView = require('./view/login_dialog.html');
let loginContainer = require('./view/login_container.html');
let loginErrorView = require('./view/login_error.html');
let loginPreloader = require('./view/login_preloader.html');
let loginPinView = require('./view/login_pin.html');

import $ from "jquery";

const Selectors = {
    KCL_LOGIN_CONTENT: '.kcl-login-content',
    KCL_LOGIN_ERROR_CONTENT: '.kcl-login-error-content',
    KCL_LOADING_ACTION_NAME: '#kcp-action-name'
}

class LoginView {
    
    _container;
    init(container) {
        this._container = container
        $(this._container).append(loginContainer);
        $(this._container).addClass('kcl-app-active');
    }

    displayError(errorCode) {
        this._injectView(loginErrorView);
        $(Selectors.KCL_LOGIN_ERROR_CONTENT).html(errorCode);
    }


    displayLoading(isShown, title) {
        if (isShown) {
            this._injectView(loginPreloader);
            $(Selectors.KCL_LOADING_ACTION_NAME).html(title);
        } else {
            this._removeView('#preloader');
        }
    }

    displayPin(pin) {
        this._injectView(loginPinView);
        let inputs = $('#pinContainer input');
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

        }, 200);
    }

    _removeView(viewSelector) {
        $(Selectors.KCL_LOGIN_CONTENT).remove(viewSelector);
    }


    _injectView(view) {
        $(Selectors.KCL_LOGIN_CONTENT).html(view);
    }

    //  displayIdentifier
    
}

export default LoginView;