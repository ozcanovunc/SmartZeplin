import PageTitleLayoutDesign from 'generated/my-components/PageTitleLayout';

export default class PageTitleLayout extends PageTitleLayoutDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
