/**
 * Created by andreyna on 3/26/2017.
 */
import CommunicationService from './communication_service';
import KCLSingleton from '../base/kcl_singleton';
import QueryStringParser from 'query-string-parser';
import {config, events} from '../config';
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
            return;
        }
        
        this._getLoginRequestID();
    }

    _getLoginRequestID() {
        this._loginController.showLoading(true, 'Sending login request...');
        CommunicationService.instance.login(this._clientId)
            .then((res) => {
                debugger;
                this._loginController.showLoading(false);
                this._handleRequestIdResponse(res);
            })
            .catch((error) => {
                this._loginController.showLoading(false);
                //TODO remove
                let res = {
//                    pin: '8597',
                    requestId: 'myrequest888'
                }
                this._handleRequestIdResponse(res);

                //TODO uncomment the following
                // console.log('LoginManager - failed to retrieve requestId');
                // this._loginController.showLoading(false);
                // this._loginController.handleError('Failed to retrieve requestId');
            })
    }


    _handleRequestIdResponse(res) {
        this._requestId = res.requestId;
        this._pin = res.pin;
        CommunicationService.instance.openWebSocketClient(this._requestId);

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
        PubSub.subscribe(events.WS_FAILED, () => {
            console.log('LogginManager onconnected to WS');
            this._loginController.handleError('Failed to open web socket')
        });
        PubSub.subscribe(events.WS_CONNECTED, () => {
            console.log('LogginManager onconnected to WS');
            this._loginController.displayCardPass('Please pass your card...', this._pin);
        });
    }
    
    
    sendRequest() {
       
    }
}

export default LoginManager;