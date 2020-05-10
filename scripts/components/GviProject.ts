import GviProjectDesign from 'generated/my-components/GviProject';
import Screen = require('sf-core/device/screen');

export default class GviProject extends GviProjectDesign {
    pageName?: string | undefined;
    private __thumbnailUrl: string;
    private __projectName: string;
    private __projectOS: string;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }

    set thumbnailUrl(url: string) {
        this.imgThumbnail.loadFromUrl({
            url: this.__thumbnailUrl = url,
            onSuccess: () => {
                // @ts-ignore
                let { width, height } = this.imgThumbnail.image;
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
        return this.__thumbnailUrl;
    }

    set projectName(name: string) {
        this.lblName.text = this.__projectName = name;
    }

    get projectName(): string {
        return this.__projectName;
    }

    set projectOS(os: string) {
        this.lblOs.text = this.__projectOS = os.toUpperCase();
    }

    get projectOS(): string {
        return this.__projectOS;
    }
    
    setDimensionsOfImage(width, height) {
        this.imgThumbnail.dispatch({
            type: "updateUserStyle",
            userStyle: { width, height }
        });
        this.applyLayout();
    }
}
