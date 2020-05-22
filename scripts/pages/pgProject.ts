import PgProjectDesign from 'generated/pages/pgProject';
import { getProject } from "service/projects";
import { showDialog } from "lib/waitDialog";
import genericErrorHandler from "lib/genericErrorHandler";

export default class PgProject extends PgProjectDesign {
    private __data = [];
    private __smallestImageDimensions = {};
    private initGridView: Function;
    private refreshGridView: Function;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.initGridView = initGridView.bind(this);
        this.refreshGridView = refreshGridView.bind(this);
    }
}

function onShow(superOnShow: () => void) {
    superOnShow();
    this.headerBar.title = this.routeData.name;
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
    let projectID = this.routeData.id;
    let dialog = showDialog();
    this.initGridView();
    getProject(projectID)
        .then((e) => {
            this.__data = e;
            this.refreshGridView();
        })
        .catch(genericErrorHandler)
        .finally(() => dialog.hide())
}

function getSmallestImageDimensions(screens) {
    let dimensions = {
        width: Number.POSITIVE_INFINITY,
        height: Number.POSITIVE_INFINITY,
    };
    screens.forEach((s) => {
        if (s.image.width < dimensions.width)
            dimensions.width = s.image.width;
        if (s.image.height < dimensions.height)
            dimensions.height = s.image.height;
    });
    return dimensions;
}

function initGridView() {
    this.gvMain.itemCount = 0;
    this.gvMain.onItemBind = (item, index) => {
        let { image } = this.__data[index];
        let url = image.original_url;
        item.screenUrl = url;
    };
    this.gvMain.onItemSelected = (item, index) => {
        this.router.push("/pages/screen", {
            screens: this.__data,
            currentIndex: index
        });
    };
    this.gvMain.layoutManager.onItemLength = (length) => {
        let { width, height } = this.__smallestImageDimensions;
        let actualWidth = length - 10;
        let actualHeight = actualWidth * height / width;
        return actualHeight;
    };
}

function refreshGridView() {
    this.__smallestImageDimensions = getSmallestImageDimensions(this.__data);
    this.gvMain.itemCount = this.__data.length;
    this.gvMain.refreshData();
}
