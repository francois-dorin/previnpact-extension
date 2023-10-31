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
    getUrlOfResource(resource) {
        return this.browser.runtime.getURL(resource);
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
        if (key == 'taillePolice') {
            setClass('taille-police', newValue);
        }
        if (key == 'agoraCondense') {
            setClass('agora-condense', newValue);
        }
        if (key == 'listeArticleCondensee') {
            setClass('liste-article-condensee', newValue);
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
        setClass('taille-police', settings.taillePolice);
        setClass('agora-condense', settings.agoraCondense);
        setClass('liste-article-condensee', settings.listeArticleCondensee);
    });
};
const init404 = () => {
    const main = body.querySelector('main');
    if (main.innerText == '' && main.id != 'video-travolta-404') {
        const video = document.createElement('video');
        const source = document.createElement('source');
        source.setAttribute('type', 'video/mp4');
        source.setAttribute('src', extensionRuntime.getUrlOfResource("/modules/content_script/assets/images/travolta_404_nxi_sombre.mp4"));
        main.id = "video-travolta-404";
        video.appendChild(source);
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        main.appendChild(video);
    }
};
loadState();
init404();
