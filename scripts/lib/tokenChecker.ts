import jwtDecode = require('jwt-decode');
import Blob = require('sf-core/blob');
import Data = require('sf-core/data');
import * as constants from "constants.json";
import { authWithRefreshToken } from "service/login";
import logout from "lib/logout";

export default function tokenChecker() {
    let accessToken = Data.getStringVariable(constants.ACCESS_TOKEN);
    let refreshToken = Data.getStringVariable(constants.REFRESH_TOKEN);
    if (isTokenValid(accessToken)) {
        return Promise.resolve();
    }
    else if (isTokenValid(refreshToken)) {
        return authWithRefreshToken();
    }
    else {
        logout();
        return Promise.reject();
    }
}

function isTokenValid(token: string) {
    let { exp } = jwtDecode(token);
    let today = new Date();
    let tokenDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
    tokenDate.setUTCSeconds(exp);
    return tokenDate > today;
}
