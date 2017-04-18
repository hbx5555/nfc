/**
 * Created by andreyna on 4/3/2017.
 */
import LoginView from './login_view';
import LoginModel from './login_model';

class LoginController {

    _loginView;
    _loginModel;

    constructor() {

    }

    start(container) {
        this._loginView = new LoginView();
        this._loginView.init(container);
    }

    handleError(error) {
        this._loginView.displayError(error);
    }

    showLoading(isShown, content) {
        this._loginView.displayLoading(isShown, content);
    }
    
    displayCardPass(title, pin) {
        if (pin) {
            this._loginView.displayPin(pin);
        }  else {
            this._loginView.displayLoading(true, title);
        }
    }
}


export default LoginController;