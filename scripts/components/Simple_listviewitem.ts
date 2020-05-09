import Simple_listviewitemDesign from 'generated/my-components/Simple_listviewitem';

export default class Simple_listviewitem extends Simple_listviewitemDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
