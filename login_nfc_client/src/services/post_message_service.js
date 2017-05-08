/**
 * Created by andreyna on 5/8/2017.
 */
import KCLSingleton from '../base/kcl_singleton';

class PostMessageService extends KCLSingleton {
    constructor() {
        super();
        this._initParentURL();
    }

    _parentURL;

    _initParentURL() {
        this._parentURL = (window.location != window.parent.location)
            ? document.referrer
            : document.location.href;
    }

    sendPostMessage(postData) {
        if (this._parentURL) {
            window.parent.postMessage(postData, this._parentURL);
        }
    }

}

export default PostMessageService;