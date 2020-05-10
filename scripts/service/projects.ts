import sc from "service";
import Data = require('sf-core/data');
import * as constants from "constants.json";
import tokenChecker from "lib/tokenChecker";

export function getProjects() {
    let accessToken = Data.getStringVariable(constants.REFRESH_TOKEN);
    return tokenChecker()
        .then(() => sc
            .request(`/projects`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
        );
}
