import PgScreenDesign from 'generated/pages/pgScreen';
import ZoomableImageView = require("sf-extension-zoomable-imageview");
import ImageView = require('sf-core/ui/imageview');
import Image = require('sf-core/ui/image');
const PLACEHOLDER = Image.createFromFile("images://placeholder.png");

export default function Factory(props) {
    return class PgScreen extends PgScreenDesign {
        constructor() {
            super();
            this.onLoad = onLoad.bind(this, this.onLoad.bind(this), props);
        }
    }
}

function onLoad(superOnLoad: () => void, props) {
    superOnLoad();
    let imgScreen = new ZoomableImageView({
        flexGrow: 1,
        imageFillType: ImageView.FillType.ASPECTFIT
    });
    imgScreen.loadFromUrl({
        url: props.image.original_url,
        placeholder: PLACEHOLDER
    });
    this.layout.addChild(imgScreen);
}
