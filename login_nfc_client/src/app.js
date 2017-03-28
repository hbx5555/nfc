/**
 * Created by andreyna on 3/26/2017.
 */
import LoginManager from './services/login_manager';
import Fingerprint from 'fingerprintjs';
import LoginComponent from './components/login_component';

class APP {

    _components = {};
    constructor() {
        this._loginManager = LoginManager.instance;
        this._fingerprint = new Fingerprint();
    }

    startApp() {
        this._components['LoginComponent'] = new LoginComponent();

        Object.keys(this._components).forEach((key) => {
            this._components[key].start('.app-container');
        });
    }
    
    // getAPI() {
    //     return this._loginManager.getManager();
    // }
    //
    // getFingerprint() {
    //     return this._fingerprint.get();
    // }
}

export default APP;