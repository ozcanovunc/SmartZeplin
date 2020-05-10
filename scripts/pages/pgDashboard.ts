import PgDashboardDesign from 'generated/pages/pgDashboard';
import showSettingsMenu from "lib/settingsMenu";
import { getProjects } from "service/projects";
import { showDialog } from "lib/waitDialog";
import genericErrorHandler from "lib/genericErrorHandler";
import HeaderBarItem = require('sf-core/ui/headerbaritem');
import Image = require('sf-core/ui/image');
import Color = require('sf-core/ui/color');

export default class PgDashboard extends PgDashboardDesign {
    private __data = [];
    private initGridView: Function;
    private refreshGridView: Function;
    private initHeaderBar: Function;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.initGridView = initGridView.bind(this);
        this.refreshGridView = refreshGridView.bind(this);
        this.initHeaderBar = initHeaderBar.bind(this);
    }
}

function onShow(superOnShow: () => void) {
    superOnShow();
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.title = global.lang.projects;
    this.initGridView();
    this.initHeaderBar();

    let dialog = showDialog();
    getProjects()
        .then((e) => {
            this.__data = e;
            this.refreshGridView();
        })
        .catch(genericErrorHandler)
        .finally(() => dialog.hide())
}

function initHeaderBar() {
    let settings = new HeaderBarItem({
        image: Image.createFromFile("images://settings.png"),
        onPress: () => showSettingsMenu(this),
        color: Color.WHITE
    });
    this.headerBar.setItems([settings]);
}

function initGridView() {
    this.gvMain.itemCount = 0;
    this.gvMain.onItemBind = (item, index) => {
        let { name, thumbnail, platform } = this.__data[index];
        item.thumbnailUrl = thumbnail;
        item.projectName = name;
        item.projectOS = platform;
    };
    this.gvMain.onItemSelected = (item, index) => {
        let { name, id } = this.__data[index];
        this.router.push("/pages/project", {
            name, id
        })
    };
    this.gvMain.layoutManager.onItemLength = (length) => {
        return 150;
    };
}

function refreshGridView() {
    this.gvMain.itemCount = this.__data.length;
    this.gvMain.refreshData();
}
