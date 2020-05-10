import PgDashboardDesign from 'generated/pages/pgDashboard';
import showSettingsMenu from "lib/settingsMenu";
import { getProjects } from "service/projects";
import { showDialog } from "lib/waitDialog";
import genericErrorHandler from "lib/genericErrorHandler";
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const Image = require('sf-core/ui/image');

export default class PgDashboard extends PgDashboardDesign {
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
}

function onShow(superOnShow: () => void) {
    superOnShow();
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.title = global.lang.projects;
    initGridView.call(this);
    initHeaderBar.call(this);

    let dialog = showDialog();
    getProjects()
        .then((e) => alert(JSON.stringify(e, null, "\t")))
        .catch(genericErrorHandler)
        .finally(() => dialog.hide())

    // TODO
    this.gvMain.itemCount = 10;
    this.gvMain.refreshData();
}

function initHeaderBar() {
    let settings = new HeaderBarItem({
        image: Image.createFromFile("images://settings.png"),
        onPress: () => showSettingsMenu(this)
    });
    this.headerBar.setItems([settings]);
}

function initGridView() {
    this.gvMain.onItemBind = function (item, index) {

    };

    this.gvMain.onItemSelected = function (item, index) {

    };

    this.gvMain.layoutManager.onItemLength = function (length) {
        return 150;
    };
}
