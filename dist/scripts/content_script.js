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
const body = document.querySelector('body');
body.classList.add('dark-theme');
body.classList.add('font-sans-serif');
extensionRuntime.onChanged((changes) => {
    console.log('change', changes);
    for (let [key, { newValue }] of Object.entries(changes)) {
        if (key == 'darkMode') {
            if (newValue) {
                body.classList.add('dark-theme');
            }
            else {
                body.classList.remove('dark-theme');
            }
        }
        if (key == 'policeSansSerif') {
            if (newValue) {
                body.classList.add('font-sans-serif');
            }
            else {
                body.classList.remove('font-sans-serif');
            }
        }
    }
});
