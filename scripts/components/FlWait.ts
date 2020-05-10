import FlWaitDesign from 'generated/my-components/FlWait';

export default class FlWait extends FlWaitDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
