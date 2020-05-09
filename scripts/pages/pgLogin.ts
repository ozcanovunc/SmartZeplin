import PgLoginDesign from 'generated/pages/pgLogin';
import { getAuthzEndpoint } from "service/login";
import Application = require("sf-core/application");

export default class PgLogin extends PgLoginDesign {
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnLogin.text = global.lang.login;
        this.btnLogin.onPress = () => {
            Application.call({
                uriScheme: getAuthzEndpoint()
            });
        };
    }
}

function onShow(superOnShow: () => void) {
    superOnShow();
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
}


// var utcSeconds = 1234567890;
// var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
// d.setUTCSeconds(utcSeconds);
// Math.floor((date2 - date1) / (1000*60*60*24)) // days