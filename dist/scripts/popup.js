const darkModeCheckBox = document.querySelector('input[name="dark-mode"]');
const policeSansSerifCheckBox = document.querySelector('input[name="police-sans-serif"]');
const setDarkMode = () => {
    const value = darkModeCheckBox.checked;
    extensionRuntime.setSettings({ darkMode: value });
};
const setPoliceSansSerif = () => {
    const value = policeSansSerifCheckBox.checked;
    extensionRuntime.setSettings({ policeSansSerif: value });
};
darkModeCheckBox.addEventListener('change', setDarkMode);
policeSansSerifCheckBox.addEventListener('change', setPoliceSansSerif);
const restoreOptions = () => {
    extensionRuntime.getSettings(['darkMode', 'policeSansSerif']).then((values) => {
        if (values.darkMode === undefined) {
            darkModeCheckBox.checked = true;
            extensionRuntime.setSettings({ darkMode: true });
        }
        else {
            darkModeCheckBox.checked = values.darkMode;
        }
        if (values.policeSansSerif === undefined) {
            policeSansSerifCheckBox.checked = false;
            extensionRuntime.setSettings({ policeSansSerif: false });
        }
        else {
            policeSansSerifCheckBox.checked = values.policeSansSerif;
        }
    });
};
document.addEventListener("DOMContentLoaded", restoreOptions);
class ExtensionRuntime {
    browser;
    constructor() {
        this.browser = this.getBrowser();
    }
    setSettings(values) {
        this.browser.storage.local.set(values);
    }
    getSettings(keys) {
        const callback = (resolve, values) => {
            console.log('settings', values);
            resolve(values);
        };
        const promise = new Promise((resolve) => {
            this.browser.storage.local.get(keys).then((values) => callback(resolve, values));
        });
        return promise;
    }
    onChanged(callback) {
        this.browser.storage.local.onChanged.addListener(callback);
    }
    getBrowser() {
        return (chrome ?? browser);
    }
}
const extensionRuntime = new ExtensionRuntime();
