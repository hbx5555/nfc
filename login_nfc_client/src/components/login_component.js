/**
 * Created by andreyna on 3/28/2017.
 */

let loginView = require('./view/login_dialog.html');
import $ from "jquery";
import LoginManager from '../services/login_manager';

class LoginComponent {

    start(container) {
        $(container).append(loginView);
        $('#testBtn').on('click', () => {
           let uuid = LoginManager.instance.getUUID();
           console.log(uuid);
        });
    }
}

export default LoginComponent;