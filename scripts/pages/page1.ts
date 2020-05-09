import Page1Design from 'generated/pages/page1';
import componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");
import PageTitleLayout  from "components/PageTitleLayout";
import System = require("sf-core/device/system");

export default class Page1 extends Page1Design {
    router: any;
	constructor () {
        super();
		// Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnNext.onPress = () => {
            // this.router.push("/pages/page2", { message: "Hello World!" });

            
        }
    }
}

function onShow(superOnShow) {
  superOnShow();
  this.headerBar.titleLayout.applyLayout();
}

function onLoad(superOnLoad) {
    superOnLoad();
    console.info('Onload page1');
    this.headerBar.leftItemEnabled = false;
    this.headerBar.titleLayout = new PageTitleLayout();
    componentContextPatch(this.headerBar.titleLayout, "titleLayout");
    if (System.OS === "Android") {
        this.headerBar.title = "";
    }
}
