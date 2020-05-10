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


Data.setStringVariable(constants.ACCESS_TOKEN, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiY2xpZW50X2lkIjoiNWViNWNmNTg2OTlmZmY0YzQyMTAyN2M5Iiwic2NvcGUiOiIiLCJpYXQiOjE1ODkwNTY2MjQsImV4cCI6MTU4OTI3MjYyNCwic3ViIjoiNTg0N2JkNjhmNjZhMTc1ZjdkNTEzZGE4IiwianRpIjoiZTY1Njc3ZTgtNWUwZi00NDVjLTlkNDYtM2FlNDJiY2FiYjcxIn0.5wO9ktI4a3HojeJV3U0XeDGLuBtlHs-NwDIE8VjuoRM")

let loggedIn = Data.getStringVariable(constants.ACCESS_TOKEN);
router.push(loggedIn ? "/pages/dashboard" : "/onboarding/login");
