/**
 * Created by andreyna on 3/26/2017.
 */
import CommunicationService from './communication_service';
import KCLSingleton from '../base/kcl_singleton';
import QueryStringParser from 'query-string-parser';
import {config} from '../config';
import PubSub from 'pubsub-js';
import LoginController from '../components/login_controller';

class LoginManager extends KCLSingleton {

    _pin;
    _requestId;
    _clientId;
    _isValidRequest;
    _isCommunicationError = false;
    _loginController;

    constructor() {
      super();
      
      this._subscribe();
    }

    startLogin() {
        this._loginController = new LoginController();
        this._loginController.start(config.uiContainer);
        let isValidParams = this._parseQueryParams();
        if (false === isValidParams) {
            this._loginController.handleError('Invalid query parameters');
        }
        
        this._getLoginRequestID();
    }

    _getLoginRequestID() {
        this._loginController.showLoading(true, 'Sending login request...');
        CommunicationService.instance.login(this._clientId);
    }


    /**
     * Parse query params and validate that all params for auth request are defined
     * @private
     */
    _parseQueryParams() {
        let isValid = false;
        let qs = QueryStringParser.fromQuery(window.location.search.slice(1));
        if (qs && qs.clientId) {
            this._clientId = qs.clientId;
            isValid = true;
        }
        return isValid;
    }


    /**
     * Get user identifier. First of all we try to get existed token from local storage.
     * If it doesn't exist, the fallback is to try request UUID from proxy server that should be installed in case the user is
     * logging in from mobile device has KCL application
     */
    getIdentifier() {
        return new Promise((resolve, reject) => {
            // if (false === this._isValidRequest) {
            //   //TODO
            // }
            // if (true === this._isCommunicationError) {
            //     reject({error: 100});
            // }
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


    _subscribe(){
        // PubSub.subscribe('WS_FAILED', () => {
        //     this._isCommunicationError = true;
        //     console.log('LogginManager onconnected to WS');
        // });
    }
    
    
    sendRequest() {
       
    }
}

export default LoginManager;