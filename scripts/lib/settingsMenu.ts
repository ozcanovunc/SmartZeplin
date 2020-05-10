import Page = require('sf-core/ui/page');
import System = require("sf-core/device/system");
import logout from "lib/logout";
const Menu = require('sf-core/ui/menu');
const MenuItem = require('sf-core/ui/menuitem');

export default function showSettingsMenu(page: Page) {
    let menu = new Menu();
    menu.headerTitle = global.lang.settings;
    let logoutItem = new MenuItem({ 
        title: global.lang.logout,
        onSelected: logout
    });
    let cancelItem = new MenuItem({ title: global.lang.cancel });

    logoutItem.ios.style = MenuItem.ios.Style.DESTRUCTIVE;
    cancelItem.ios.style = MenuItem.ios.Style.CANCEL;

    let items = [logoutItem];
    System.OS === "iOS" && items.push(cancelItem);
    menu.items = items;
    menu.show(page);
}
