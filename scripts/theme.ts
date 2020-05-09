import Data = require("sf-core/data");
import Application = require("sf-core/application");
const { config } = require("./settings.json");
const themeConfig = config.theme;
const { createThemeContextBound } = require("@smartface/contx/lib/styling/ThemeContext");
const currentTheme = Data.getStringVariable("currentTheme") || themeConfig.currentTheme;
const { clearCache } = require("sf-extension-utils/lib/getCombinedStyle");
const themeSources = themeConfig.themes
    .map(name => ({
        name,
        rawStyles: require(`./generated/themes/${name}`),
        isDefault: currentTheme === name
    }));
Application["theme"] = createThemeContextBound(themeSources);
type ThemeListener = (themeName: string) => void;

const themeListeners = new WeakMap<{}, ThemeListener>();
const themeListenerKeys:{}[] = [];
export const ThemeService = {
    onChange(listener: ThemeListener) {
        const key = {};
        themeListenerKeys.push(key)
        themeListeners.set(key, listener);
        const deletionIndex = themeListenerKeys.length - 1;

        return () => {
            if(themeListeners.has(key)){
                themeListeners.delete(key);
                themeListenerKeys.splice(deletionIndex, 1);
            }
        }
    },
    changeTheme(name: string) {
        Application["theme"]()({
            type: "changeTheme",
            theme: name
        });
        clearCache();
        themeListenerKeys.forEach((key) => {
            if(themeListeners.has(key)){
                themeListeners.get(key)(name);
            }
        })
    }
}
