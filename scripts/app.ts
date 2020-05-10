require("i18n/i18n.js");
import Application = require("sf-core/application");
import Data = require('sf-core/data');
import { errorStackBySourceMap } from "error-by-sourcemap";
import System = require("sf-core/device/system");
import "./theme";
import router from "routes";
import * as constants from "constants.json";
require("sf-extension-utils");

Application.onUnhandledError = function (e: UnhandledError) {
    const error = errorStackBySourceMap(e);
    alert({
        title: e.type || global.lang.applicationError,
        message: System.OS === "Android" ? error.stack : (e.message + "\n\n*" + error.stack)
    });
};

let loggedIn = Data.getStringVariable(constants.ACCESS_TOKEN);
router.push(loggedIn ? "/pages/dashboard" : "/onboarding/login");
