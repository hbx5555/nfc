/**
 * Created by andreyna on 3/26/2017.
 */
import CommunicationService from './communication_service';
import KCLSingleton from '../base/kcl_singleton';
class LoginManager extends KCLSingleton{

    _communicationService;

    constructor() {
      super();
       this._communicationService = new CommunicationService();
    }

    getUUID() {
        return this._communicationService.getUUID();
    }
}

export default LoginManager;