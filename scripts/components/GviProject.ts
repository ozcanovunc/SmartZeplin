import GviProjectDesign from 'generated/my-components/GviProject';

export default class GviProject extends GviProjectDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
