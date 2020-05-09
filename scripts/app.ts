/* globals lang */
require("i18n/i18n.js");
import Application = require("sf-core/application");
import { errorStackBySourceMap } from "error-by-sourcemap";
import System = require("sf-core/device/system");

Application.onUnhandledError = function (e: UnhandledError) {
    const error = errorStackBySourceMap(e);
    alert({
        title: e.type || lang.applicationError,
        message: System.OS === "Android" ? error.stack : (e.message + "\n\n*" + error.stack)
    });
};

import "./theme";
import { getAccessToken } from "service/login";
import * as config from "config.json";
require("sf-extension-utils");
const URI = require('urijs');
const router = require("./routes");
router.push("/onboarding/login");

Application.onApplicationCallReceived = (e) => {
    if (e && e.data && e.data.url && e.data.url.startsWith(config.redirectUri)) {
        let res = URI(e.data.url).query(true);
        getAccessToken(res.code)
            .then((e) => {
                alert(JSON.stringify(e, null, 4))
                router.push("/pages/dashboard");
            })
            .catch((e) => {
                alert(JSON.stringify(e, null, 4))
            })
    }
};
