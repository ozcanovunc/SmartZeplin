import PgDashboardDesign from 'generated/pages/pgDashboard';

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
    
    initGridView.call(this);
    this.gvMain.itemCount = 10;   
    this.gvMain.refreshData();
}

function initGridView() {
    this.gvMain.onItemBind = function(item, index) {

    };

    this.gvMain.onItemSelected = function(item, index) {

    };

    this.gvMain.layoutManager.onItemLength = function(length) {
        return 150;
    };
}