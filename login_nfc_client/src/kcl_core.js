/**
 * Created by andreyna on 3/26/2017.
 */
import LoginManager from './services/login_manager';

class API {
    //loginManager = null;

    constructor() {
        console.log('API');
        this._loginManager = new LoginManager();
    }

    getAPI() {
        return this._loginManager.getManager();

    }
}

export default new API();