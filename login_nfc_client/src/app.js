/**
 * Created by andreyna on 3/26/2017.
 */
import LoginManager from './services/login_manager';
import Fingerprint from 'fingerprintjs';
import LoginComponent from './components/login_component';
import {events, errors} from './config';
import PubSub from 'pubsub-js';
import CommunicationService from './services/communication_service';

class APP {

    _components = {};
    constructor() {
    }

    startApp() {
        this._subscribe();
        CommunicationService.instance.initCommunication();
    }


    _subscribe() {
        this._components['LoginComponent'] = new LoginComponent();
        PubSub.subscribe(events.WS_CONNECTED, () => {
            debugger;
            this._components['LoginComponent'].start('.app-container', 200);
            PubSub.unsubscribe(events.WS_FAILED);
        });


        PubSub.subscribe(events.WS_FAILED, () => {
            this._components['LoginComponent'].start('.app-container', errors.COMMUNICATION_FAILED);
        });
    }

}

export default APP;