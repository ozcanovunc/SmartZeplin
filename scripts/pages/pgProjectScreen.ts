import PgProjectScreenDesign from 'generated/pages/pgProjectScreen';
import PgScreen from 'pages/pgScreen';
import HeaderBarItem = require('sf-core/ui/headerbaritem');
import Image = require('sf-core/ui/image');
import Share = require('sf-core/share');
import Color = require('sf-core/ui/color');
const SwipeView = require("sf-core/ui/swipeview");

export default class PgProjectScreen extends PgProjectScreenDesign {
    routeData: any;
    selectedIndex: number;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initHeaderBar() {
        let settings = new HeaderBarItem({
            image: Image.createFromFile("images://share.png"),
            onPress: () => {
                let { image, name } = this.routeData.screens[this.selectedIndex];
                let url = image.original_url;
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

    initSwipeView() {
        let { screens, currentIndex } = this.routeData;
        let swipeView = new SwipeView({
            page: this,
            onPageSelected: (e) => {
                this.selectedIndex = e;
                this.headerBar.title = screens[this.selectedIndex].name;
            },
            pages: screens.map(PgScreen)
        });
        //@ts-ignore
        this.layout.addChild(swipeView, "swipeView", ".grow-relative");
        swipeView.swipeToIndex(currentIndex);
        swipeView.onPageSelected(currentIndex);
    }
}

function onShow(superOnShow: () => void) {
    superOnShow();
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.selectedIndex = this.routeData.currentIndex;
    this.initSwipeView();
    this.initHeaderBar();
}
