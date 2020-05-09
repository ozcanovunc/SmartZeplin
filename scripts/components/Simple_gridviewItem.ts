import Simple_gridviewItemDesign from 'generated/my-components/Simple_gridviewItem';

export default class Simple_gridviewItem extends Simple_gridviewItemDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
