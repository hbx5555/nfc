/**
 * Created by andreyna on 3/28/2017.
 */
import {config} from '../config';

class CommunicationService {
    getUUID() {
        return config.endpoints.localProxy;
    }
}

export default CommunicationService;