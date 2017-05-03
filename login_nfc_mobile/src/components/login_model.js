/**
 * Created by andreyna on 4/3/2017.
 */
class LoginModel {
    _identifier;
    _pin;
    _requestId;
    _clientId;


    get identifier() {
        return this._identifier;
    }

    set identifier(value) {
        this._identifier = value;
    }

    get pin() {
        return this._pin;
    }

    set pin(value) {
        this._pin = value;
    }

    get requestId() {
        return this._requestId;
    }

    set requestId(value) {
        this._requestId = value;
    }

    get clientId() {
        return this._clientId;
    }

    set clientId(value) {
        this._clientId = value;
    }
}

export default LoginModel;