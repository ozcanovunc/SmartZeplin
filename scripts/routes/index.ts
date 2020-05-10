const OS = require('sf-core/device/system').OS;
const buildExtender = require("sf-extension-utils/lib/router/buildExtender");
const {
    NativeRouter: Router,
    NativeStackRouter: StackRouter,
    Route
} = require("@smartface/router");
require("sf-extension-utils/lib/router/goBack"); // Implements onBackButtonPressed
const backClose = require("sf-extension-utils/lib/router/back-close");
const Image = require('sf-core/ui/image');
backClose.setDefaultBackStyle({
    image: Image.createFromFile("images://back.png"),
    hideTitle: true
});

const router = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/onboarding",
            routes: [
                Route.of({
                    path: "/onboarding/login",
                    build: buildExtender({ getPageClass: () => require("pages/pgLogin").default, headerBarStyle: { visible: false } })
                })
            ]
        }),
        StackRouter.of({
            path: "/pages",
            routes: [
                Route.of({
                    path: "/pages/dashboard",
                    build: buildExtender({ getPageClass: () => require("pages/pgDashboard").default, headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/project",
                    build: buildExtender({ getPageClass: () => require("pages/pgProject").default, headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/screen",
                    build: buildExtender({ getPageClass: () => require("pages/pgScreen").default, headerBarStyle: { visible: true } })
                })
            ]
        })
    ]
});

export default router;
