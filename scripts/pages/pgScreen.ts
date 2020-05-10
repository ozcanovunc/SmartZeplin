import PgScreenDesign from 'generated/pages/pgScreen';
import ZoomableImageView = require("sf-extension-zoomable-imageview");
import Screen = require('sf-core/device/screen');
import ImageView = require('sf-core/ui/imageview');
import Application = require('sf-core/application');
import System = require('sf-core/device/system');
import HeaderBarItem = require('sf-core/ui/headerbaritem');
import Image = require('sf-core/ui/image');
import Share = require('sf-core/share');
import Color = require('sf-core/ui/color');

export default class PgScreen extends PgScreenDesign {
    private initHeaderBar: Function;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.initHeaderBar = initHeaderBar.bind(this);
    }
}

function onShow(superOnShow: () => void) {
    superOnShow();
    this.headerBar.title = this.routeData.name;

    let headerBarHeight = System.OS === "iOS" ?
        this.parentController.headerBar.height :
        this.headerBar.height;
    let statusBarHeight = Application.statusBar.height;
    let imageHeight = Screen.height - headerBarHeight - statusBarHeight;

    let imgScreen = new ZoomableImageView({
        width: Screen.width,
        height: imageHeight,
        imageFillType: ImageView.FillType.ASPECTFIT
    });
    imgScreen.loadFromUrl({
        url: this.routeData.url,
        placeholder: Image.createFromFile("images://placeholder.png")
    });
    this.layout.addChild(imgScreen);
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initHeaderBar();
}

function initHeaderBar() {
    let settings = new HeaderBarItem({
        image: Image.createFromFile("images://share.png"),
        onPress: () => {
            let { name, url } = this.routeData;
            let text = `${name}\n\n${url}`;
            Share.share({
                items: [text],
                page: this
            });
        },
        color: Color.WHITE
    });
    this.headerBar.setItems([settings]);
}
