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
                })
            ]
        })
    ]
});

export = router;
