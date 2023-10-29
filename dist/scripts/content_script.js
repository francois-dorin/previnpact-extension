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
            resolve(values);
        };
        const promise = new Promise((resolve) => {
            this.browser.storage.local.get(keys).then((values) => callback(resolve, values));
        });
        return promise;
    }
    getAllSettings() {
        const callback = (resolve, values) => {
            resolve(values);
        };
        const promise = new Promise((resolve) => {
            this.browser.storage.local.get().then((values) => callback(resolve, values));
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
const body = document.querySelector('body');
const setClass = (className, condition) => {
    if (condition) {
        body.classList.add(className);
    }
    else {
        body.classList.remove(className);
    }
};
extensionRuntime.onChanged((changes) => {
    for (let [key, { newValue }] of Object.entries(changes)) {
        if (key == 'darkMode') {
            setClass('dark-theme', newValue);
        }
        if (key == 'policeSansSerif') {
            setClass('font-sans-serif', newValue);
        }
        if (key == 'texteJustifie') {
            setClass('texte-justifie', newValue);
        }
        if (key == 'avecCesure') {
            setClass('avec-cesure', newValue);
        }
        if (key == 'ecranLarge') {
            setClass('ecran-large', newValue);
        }
    }
});
const loadState = () => {
    extensionRuntime
        .getAllSettings()
        .then(settings => {
        setClass('dark-theme', settings.darkMode);
        setClass('font-sans-serif', settings.policeSansSerif);
        setClass('texte-justifie', settings.texteJustifie);
        setClass('avec-cesure', settings.avecCesure);
        setClass('ecran-large', settings.ecranLarge);
    });
};
loadState();
