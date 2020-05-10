const Dialog = require("sf-core/ui/dialog");
const guid = require("sf-extension-utils/lib/guid");
const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");
import FlWait from "components/FlWait";

export function showDialog() {
    let dialog = new Dialog();
    let flWait = new FlWait();
    componentContextPatch(dialog, `dialog${guid()}`);
    dialog.layout.addChild(flWait, `flWait${guid()}`, ".flWait");
    dialog.layout.applyLayout();
    dialog.show();
    return dialog;
}
