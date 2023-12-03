const policeSansSerifCheckBox = document.querySelector('input[name="police-sans-serif"]');
const texteJustifieCheckBox = document.querySelector('input[name="texte-justifie"]');
const avecCesureCheckBox = document.querySelector('input[name="avec-cesure"]');
const ecranLargeSelect = document.querySelector('select[name="ecran-large"]');
const taillePoliceCheckBox = document.querySelector('input[name="taille-police"]');
const agoraCondenseCheckBox = document.querySelector('input[name="agora-condense"]');
const listeArticleCondenseeCheckBox = document.querySelector('input[name="liste-article-condensee"]');
const navigationCommentairesCheckBox = document.querySelector('input[name="navigation-commentaires"]');
const agoraReplieCheckBox = document.querySelector('input[name="agora-replie"]');
const themeCheckBox = document.querySelector('input[name="theme"]');
const ordreCommentairesSelect = document.querySelector('select[name="ordre-commentaires"]');
const setTheme = () => {
    const value = themeCheckBox.checked;
    extensionRuntime.setSettings({ theme: value });
};
const setPoliceSansSerif = () => {
    const value = policeSansSerifCheckBox.checked;
    extensionRuntime.setSettings({ policeSansSerif: value });
};
const setTexteJustifie = () => {
    const value = texteJustifieCheckBox.checked;
    extensionRuntime.setSettings({ texteJustifie: value });
    avecCesureCheckBox.disabled = !value;
};
const setAvecCesure = () => {
    const value = avecCesureCheckBox.checked;
    extensionRuntime.setSettings({ avecCesure: value });
};
const setEcranLarge = () => {
    const value = ecranLargeSelect.value;
    if (value) {
        extensionRuntime.setSettings({ ecranLarge: value });
    }
    else {
        extensionRuntime.setSettings({ ecranLarge: false });
    }
};
const setTaillePolice = () => {
    const value = taillePoliceCheckBox.checked;
    extensionRuntime.setSettings({ taillePolice: value });
};
const setAgoraCondense = () => {
    const value = agoraCondenseCheckBox.checked;
    extensionRuntime.setSettings({ agoraCondense: value });
};
const setListeArticleCondensee = () => {
    const value = listeArticleCondenseeCheckBox.checked;
    extensionRuntime.setSettings({ listeArticleCondensee: value });
};
const setNavigationCommentaires = () => {
    const value = navigationCommentairesCheckBox.checked;
    extensionRuntime.setSettings({ navigationCommentaires: value });
};
const setAgoraReplie = () => {
    const value = agoraReplieCheckBox.checked;
    extensionRuntime.setSettings({ agoraReplie: value });
};
const setOrdreCommentaires = () => {
    const value = ordreCommentairesSelect.value;
    extensionRuntime.setSettings({ ordreCommentaires: value });
};
themeCheckBox.addEventListener('change', setTheme);
policeSansSerifCheckBox.addEventListener('change', setPoliceSansSerif);
texteJustifieCheckBox.addEventListener('change', setTexteJustifie);
avecCesureCheckBox.addEventListener('change', setAvecCesure);
ecranLargeSelect.addEventListener('change', setEcranLarge);
taillePoliceCheckBox.addEventListener('change', setTaillePolice);
agoraCondenseCheckBox.addEventListener('change', setAgoraCondense);
listeArticleCondenseeCheckBox.addEventListener('change', setListeArticleCondensee);
navigationCommentairesCheckBox.addEventListener('change', setNavigationCommentaires);
agoraReplieCheckBox.addEventListener('change', setAgoraReplie);
ordreCommentairesSelect.addEventListener('change', setOrdreCommentaires);
const restoreOptions = () => {
    extensionRuntime.getAllSettings().then((values) => {
        if (values.theme === undefined) {
            themeCheckBox.checked = false;
            setTheme();
        }
        else {
            themeCheckBox.checked = values.theme;
        }
        if (values.policeSansSerif === undefined) {
            policeSansSerifCheckBox.checked = false;
            setPoliceSansSerif();
        }
        else {
            policeSansSerifCheckBox.checked = values.policeSansSerif;
        }
        if (values.texteJustifie === undefined) {
            texteJustifieCheckBox.checked = true;
            setTexteJustifie();
        }
        else {
            texteJustifieCheckBox.checked = values.texteJustifie;
            setTexteJustifie();
        }
        if (values.avecCesure === undefined) {
            avecCesureCheckBox.checked = true;
            setAvecCesure();
        }
        else {
            avecCesureCheckBox.checked = values.avecCesure;
        }
        if (values.ecranLarge === undefined) {
            ecranLargeSelect.value = "";
            setEcranLarge();
        }
        else {
            ecranLargeSelect.value = values.ecranLarge ?? "default";
        }
        if (values.taillePolice === undefined) {
            taillePoliceCheckBox.checked = false;
            setTaillePolice();
        }
        else {
            taillePoliceCheckBox.checked = values.taillePolice;
        }
        if (values.agoraCondense === undefined) {
            agoraCondenseCheckBox.checked = true;
            setAgoraCondense();
        }
        else {
            agoraCondenseCheckBox.checked = values.agoraCondense;
        }
        if (values.listeArticleCondensee === undefined) {
            listeArticleCondenseeCheckBox.checked = true;
            setListeArticleCondensee();
        }
        else {
            listeArticleCondenseeCheckBox.checked = values.listeArticleCondensee;
        }
        if (values.navigationCommentaires === undefined) {
            navigationCommentairesCheckBox.checked = true;
            setNavigationCommentaires();
        }
        else {
            navigationCommentairesCheckBox.checked = values.navigationCommentaires;
        }
        if (values.agoraReplie === undefined) {
            agoraReplieCheckBox.checked = false;
            setAgoraReplie();
        }
        else {
            agoraReplieCheckBox.checked = values.agoraReplie;
        }
        if (values.ordreCommentaires === undefined) {
            ordreCommentairesSelect.value = "";
            setOrdreCommentaires();
        }
        else {
            ordreCommentairesSelect.value = values.ordreCommentaires ?? "default";
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
