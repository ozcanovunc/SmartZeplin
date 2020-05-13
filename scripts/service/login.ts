import * as config from "config.json";
import * as constants from "constants.json";
import sc from "service";
import Data = require('sf-core/data');

export function getAuthzEndpoint() {
    return `${config.baseUrl}/oauth/authorize?response_type=code&client_id=` +
        `${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&state=foobar`;
}

export function authWithCode(code: string) {
    return sc
        .request(`/oauth/token`, {
            method: "POST",
            body: {
                "grant_type": "authorization_code",
                "client_id": config.clientId,
                "client_secret": config.clientSecret,
                code,
                "redirect_uri": config.redirectUri2
            }
        })
        .then((e) => {
            let { access_token, refresh_token } = e;
            Data.setStringVariable(constants.ACCESS_TOKEN, access_token);
            Data.setStringVariable(constants.REFRESH_TOKEN, refresh_token);
        });
}

export function authWithRefreshToken() {
    let refreshToken = Data.getStringVariable(constants.REFRESH_TOKEN);
    return sc
        .request(`/oauth/token`, {
            method: "POST",
            body: {
                "grant_type": "refresh_token",
                "client_id": config.clientId,
                "client_secret": config.clientSecret,
                "refresh_token": refreshToken,
                //"redirect_uri": config.redirectUri2
            }
        })
        .then((e) => {
            let { access_token, refresh_token } = e;
            Data.setStringVariable(constants.ACCESS_TOKEN, access_token);
            Data.setStringVariable(constants.REFRESH_TOKEN, refresh_token);
        });
}
