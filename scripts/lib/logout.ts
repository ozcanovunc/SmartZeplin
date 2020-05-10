import * as constants from "constants.json";
import Application = require("sf-core/application");
const Data = require('sf-core/data');

export default function logout() {
    Data.removeVariable(constants.ACCESS_TOKEN);
    Data.removeVariable(constants.REFRESH_TOKEN);
    Application.restart();
}
