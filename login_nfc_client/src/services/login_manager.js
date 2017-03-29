/**
 * Created by andreyna on 3/26/2017.
 */
import CommunicationService from './communication_service';
import KCLSingleton from '../base/kcl_singleton';
import {config} from '../config';

class LoginManager extends KCLSingleton {

    _pin;
    _requestId;

    constructor() {
      super();
    }


    /**
     * Get user identifier. First of all we try to get existed token from local storage.
     * If it doesn't exist, the fallback is to try request UUID from proxy server that should be installed in case the user is
     * logging in from mobile device has KCL application
     */
    getIdentifier() {
        return new Promise((resolve, reject) => {
            let token = this._getTokenFromStorage();
            if (token) {
                resolve(token);
            } else {
                return CommunicationService.instance.getUUID()
                    .then((res) => {
                        resolve('123456');
                    })
                    .catch((error) => {
                        console.log('LoginManager - failed to retrieve UUID');
                        reject(error);
                    })
            }
        });
    }


    getRequestId() {
        if (this._requestId) {
            return this._requestId;
        }
        let s4 = fn => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };

        this._requestId = s4() + s4()  + s4()  + s4() +
            s4()  + s4() + s4() + s4();

        return this._requestId;
    }


    getPIN() {
        if (this._pin) {
            return this._pin;
        }
        let s4 = fn => {
            return Math.floor((Math.random() * 10))
        };

        this._pin = [s4(), s4(), s4(), s4()];

        return this._pin;
    }


    /**
     *
     * @returns {string|null}
     * @private
     */
    _getTokenFromStorage() {
        if (window.localStorage) {
            return window.localStorage.getItem(config.kcpTokenName);
        }
    }
}

export default LoginManager;