import GviScreenDesign from 'generated/my-components/GviScreen';
import Image = require('sf-core/ui/image');

export default class GviScreen extends GviScreenDesign {
    pageName?: string | undefined;
    private __screenUrl: string;
	constructor(props?: any, pageName?: string) {
		super(props);
		this.pageName = pageName;
    }
    
    set screenUrl(url: string) {
        this.imgScreen.loadFromUrl({
            url: this.__screenUrl = url,
            placeholder: Image.createFromFile("images://placeholder.png"),
            onSuccess: () => {
                // @ts-ignore
                let { width, height } = this.imgScreen.image;
                let actualWidth = this.width - 10;
                let actualHeight = actualWidth * height / width;
                this.setDimensionsOfImage(actualWidth, actualHeight);
            },
            onFailure: () => {
                this.setDimensionsOfImage(0, 0);
            }
        });
    }

    get thumbnailUrl(): string {
        return this.__screenUrl;
    }

    setDimensionsOfImage(width, height) {
        this.imgScreen.dispatch({
            type: "updateUserStyle",
            userStyle: { width, height }
        });
        this.applyLayout();
    }
}
