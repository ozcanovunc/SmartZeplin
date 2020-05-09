import PgLoginDesign from 'generated/pages/pgLogin';

export default class PgLogin extends PgLoginDesign {
	constructor() {
		super();
		this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnLogin.text = global.lang.login;
	}
}

function onShow(superOnShow: () => void) {
	superOnShow();
}

function onLoad(superOnLoad: () => void) {
	superOnLoad();
}
