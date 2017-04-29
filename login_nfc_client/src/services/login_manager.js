/**
 * Created by andreyna on 3/26/2017.
 */
import CommunicationService from './communication_service';
import KCLSingleton from '../base/kcl_singleton';
import QueryStringParser from 'query-string-parser';
import {selectors, events} from '../kcl_consts';
import PubSub from 'pubsub-js';
import LoginController from '../components/login_controller';

class LoginManager extends KCLSingleton {

    _pin;
    _channelID;
    _clientId;
    _ott;
    _loginController;
    _isDebugMode;

    constructor() {
      super();

    }


    startLogin() {
        this._subscribe();
        this._loginController = new LoginController();
        this._loginController.start(selectors.uiContainer);
        let isValidParams = this._parseQueryParams();
        if (false === isValidParams) {
            this._loginController.handleError('Invalid query parameters');
            return;
        }

        this._loginController.showLoading(true, 'Sending login request...');
        this._getLoginChannelID(this._clientId)
            .then((res) => {
                this._loginController.showLoading(false);
                this._handleChannelIDResponse(res);
            })
            .catch((error) => {
                console.log(error);
                console.log('LoginManager - failed to retrieve requestId');
                this._loginController.showLoading(false);
                this._loginController.handleError('Failed to retrieve requestId');
            })
    }

    _getLoginChannelID(clientId) {
        return CommunicationService.instance.getChannel(clientId)
    }


    _handleChannelIDResponse(res) {
        this._channelID = res.channel;
        this._pin = res.pin;
        CommunicationService.instance.openWebSocketClient(this._channelID);
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

            CommunicationService.instance.auth(this._ott)
                .then((res) => {
                    this._loginController.showLoading(false);
                    console.log(res);
                    window.parent.postMessage(res, '*');
                   // window.location = res.RedirectURL + '?' + 'access=' + res.AccessToken;
                })
                .catch((error) => {
                    console.log('LoginManager - failed to retrieve access token');
                    this._loginController.showLoading(false);
                    this._loginController.handleError('Failed to retrieve requestId');
                })
            //TODO close WS
        });
    }
    
    
    sendRequest() {
       
    }
}

export default LoginManager;