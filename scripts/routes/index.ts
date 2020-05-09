const OS = require('sf-core/device/system').OS;
const buildExtender = require("sf-extension-utils/lib/router/buildExtender");
const {
    NativeRouter: Router,
    NativeStackRouter: StackRouter,
    Route
} = require("@smartface/router");
require("sf-extension-utils/lib/router/goBack"); // Implements onBackButtonPressed
const router = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            routes: [
                Route.of({
                    path: "/pages/page1",
                    build: buildExtender({ getPageClass: () => require("pages/page1").default, headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/page2",
                    build: buildExtender({ getPageClass: () => require("pages/page2").default, headerBarStyle: { visible: true } })
                }),
            ]
        })
    ]
});

export = router;
