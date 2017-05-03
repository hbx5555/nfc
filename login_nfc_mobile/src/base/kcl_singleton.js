/**
 * Created by andreyna on 3/28/2017.
 */
let instance = null;

class KCLSingleton{

    /**
     * @static
     */
    static $instance = null;

    static get instance() {
        if(!this.$instance){
            console.log('Create sigleton');
            this.$instance = new this();
        }
        return this.$instance;
    }
    
    constructor() {

    }
}

export default KCLSingleton;