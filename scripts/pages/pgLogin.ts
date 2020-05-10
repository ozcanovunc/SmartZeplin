import PgLoginDesign from 'generated/pages/pgLogin';
import { getAuthzEndpoint, authWithCode } from "service/login";
import Application = require("sf-core/application");
import { showDialog } from "lib/waitDialog";
import * as config from "config.json";
import genericErrorHandler from "lib/genericErrorHandler";
import router from "routes";
const Animator = require('sf-core/ui/animator');
const Screen = require('sf-core/device/screen');
const URI = require('urijs');

Application.onApplicationCallReceived = (e) => {
    alert(JSON.stringify(e, null, "\t"));
    return
    if (e && e.data && e.data.url && e.data.url.startsWith(config.redirectUri)) {
        let { code } = URI(e.data.url).query(true);
        let dialog = showDialog();
        authWithCode(code)
            .then(() => router.push("/pages/dashboard"))
            .catch(genericErrorHandler)
            .finally(() => dialog.hide())
    }
};

export default class PgLogin extends PgLoginDesign {
    animateLoginLayout?: Function;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.animateLoginLayout = animateLoginLayout.bind(this);
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
    this.animateLoginLayout();
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
}

function animateLoginLayout() {
    this.flBottom.bottom = -(Screen.height / 2);
    this.layout.applyLayout();
    setTimeout(() => {
        Animator
            .animate(this.layout, 300, () => {
                this.flBottom.bottom = -20;
            })
            .then(100, () => {
                this.flBottom.bottom = -30;
            })
            .then(100, () => {
                this.flBottom.bottom = -20;
            });
    }, 1000);
}

// var utcSeconds = 1234567890;
// var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
// d.setUTCSeconds(utcSeconds);
// Math.floor((date2 - date1) / (1000*60*60*24)) // days