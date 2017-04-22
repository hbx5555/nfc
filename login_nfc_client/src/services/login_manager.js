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
    _ott;
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
        // setTimeout(() => {
        //
        // })
        this._loginController.showLoading(true, 'Sending login request...');
        CommunicationService.instance.login(this._clientId)
            .then((res) => {
                this._loginController.showLoading(false);
                this._handleRequestIdResponse(res);
            })
            .catch((error) => {
                console.log('LoginManager - failed to retrieve requestId');
                this._loginController.showLoading(false);
                this._loginController.handleError('Failed to retrieve requestId');
            })
    }


    _handleRequestIdResponse(res) {
        this._requestId = res.RequestId;
        this._pin = res.PIN;
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
            this._loginController.handleError('Failed to open web socket');
            //this._loginController.displayCardPass('Please pass your card...', this._pin);
        });
        PubSub.subscribe(events.WS_CONNECTED, () => {
            console.log('LogginManager onconnected to WS');
            this._loginController.displayCardPass('Please pass your card...', this._pin);
        });
        PubSub.subscribe(events.WS_MESSAGE_RECEIVED, (msg, data) => {
           //one time token
            this._ott = data.ott;
            this._loginController.showLoading(true, 'OTT Received, sending Authentication request...');
            //TODO close WS
            CommunicationService.instance.auth(this._ott)
                .then((res) => {
                    this._loginController.showLoading(false);
                    let f = {"AccessToken":"dx0p7acsug2v05ps","RedirectURL":"https://www.google.co.il"};
                    this._loginController.showLoading(false, '');
                    window.location = res.RedirectURL + '?' + 'access=' + res.AccessToken;
                })
                .catch((error) => {
                    console.log('LoginManager - failed to retrieve access token');
                    this._loginController.showLoading(false);
                    this._loginController.handleError('Failed to retrieve requestId');
                })
        });
    }
    
    
    sendRequest() {
       
    }
}

export default LoginManager;