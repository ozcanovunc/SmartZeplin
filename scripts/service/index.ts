import * as config from "config.json";
const ServiceCall = require("sf-extension-utils/lib/service-call");
const sc = new ServiceCall({
    baseUrl: config.baseUrl,
    logEnabled: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

export default sc;
