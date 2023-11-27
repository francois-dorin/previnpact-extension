const policeSansSerifCheckBox = document.querySelector('input[name="police-sans-serif"]') as HTMLInputElement;
const texteJustifieCheckBox = document.querySelector('input[name="texte-justifie"]') as HTMLInputElement;
const avecCesureCheckBox = document.querySelector('input[name="avec-cesure"]') as HTMLInputElement;
//const ecranLargeCheckBox = document.querySelector('input[name="ecran-large"]') as HTMLInputElement;
const taillePoliceCheckBox = document.querySelector('input[name="taille-police"]') as HTMLInputElement;
const agoraCondenseCheckBox = document.querySelector('input[name="agora-condense"]') as HTMLInputElement;
const listeArticleCondenseeCheckBox = document.querySelector('input[name="liste-article-condensee"]') as HTMLInputElement;
const navigationCommentairesCheckBox = document.querySelector('input[name="navigation-commentaires"]') as HTMLInputElement;
const agoraReplieCheckBox = document.querySelector('input[name="agora-replie"]') as HTMLInputElement;
const themeCheckBox = document.querySelector('input[name="theme"]') as HTMLInputElement;

const setTheme = () => {
    const value = themeCheckBox.checked;
    extensionRuntime.setSettings({ theme: value });
}

const setPoliceSansSerif = () => {
    const value = policeSansSerifCheckBox.checked;
    extensionRuntime.setSettings({policeSansSerif: value});
}

const setTexteJustifie = () => {
    const value = texteJustifieCheckBox.checked;
    extensionRuntime.setSettings({texteJustifie: value});
    avecCesureCheckBox.disabled = !value;
}

const setAvecCesure = () => {
    const value = avecCesureCheckBox.checked;
    extensionRuntime.setSettings({avecCesure: value});
}

// const setEcranLarge = () => {
//     const value = ecranLargeCheckBox.checked;
//     extensionRuntime.setSettings({ecranLarge: value});
// }

const setTaillePolice = () => {
    const value = taillePoliceCheckBox.checked;
    extensionRuntime.setSettings({taillePolice: value});
}

const setAgoraCondense = () => {
    const value = agoraCondenseCheckBox.checked;
    extensionRuntime.setSettings({agoraCondense: value});
}

const setListeArticleCondensee = () => {
    const value = listeArticleCondenseeCheckBox.checked;
    extensionRuntime.setSettings({listeArticleCondensee: value});
}

const setNavigationCommentaires = () => {
    const value = navigationCommentairesCheckBox.checked;
    extensionRuntime.setSettings({navigationCommentaires: value});
}

const setAgoraReplie = () => {
    const value = agoraReplieCheckBox.checked;
    extensionRuntime.setSettings({agoraReplie: value});
}

themeCheckBox.addEventListener('change', setTheme);
policeSansSerifCheckBox.addEventListener('change', setPoliceSansSerif);
texteJustifieCheckBox.addEventListener('change',setTexteJustifie);
avecCesureCheckBox.addEventListener('change', setAvecCesure);
//ecranLargeCheckBox.addEventListener('change', setEcranLarge);
taillePoliceCheckBox.addEventListener('change', setTaillePolice);
agoraCondenseCheckBox.addEventListener('change', setAgoraCondense);
listeArticleCondenseeCheckBox.addEventListener('change', setListeArticleCondensee);
navigationCommentairesCheckBox.addEventListener('change', setNavigationCommentaires);
agoraReplieCheckBox.addEventListener('change', setAgoraReplie);

const restoreOptions = () => {
    extensionRuntime.getAllSettings().then((values) => {
        if (values.theme === undefined) {
            themeCheckBox.checked = false;
            setTheme();
        } else {
            themeCheckBox.checked = values.theme;
        }

        if (values.policeSansSerif === undefined) {
            policeSansSerifCheckBox.checked = false;
            setPoliceSansSerif();
        } else {
            policeSansSerifCheckBox.checked = values.policeSansSerif;
        }

        if (values.texteJustifie === undefined) {
            texteJustifieCheckBox.checked = true;
            setTexteJustifie();
        } else {
            texteJustifieCheckBox.checked = values.texteJustifie;
            setTexteJustifie();
        }

        if (values.avecCesure === undefined) {
            avecCesureCheckBox.checked = true;
            setAvecCesure();
        } else {
            avecCesureCheckBox.checked = values.avecCesure;
        }

        // if (values.ecranLarge === undefined) {
        //     ecranLargeCheckBox.checked = true;
        //     setEcranLarge();
        // } else {
        //     ecranLargeCheckBox.checked = values.ecranLarge;
        // }

        if (values.taillePolice === undefined) {
            taillePoliceCheckBox.checked = false;
            setTaillePolice();
        } else {
            taillePoliceCheckBox.checked = values.taillePolice;
        }

        if (values.agoraCondense === undefined) {
            agoraCondenseCheckBox.checked = true;
            setAgoraCondense();
        } else {
            agoraCondenseCheckBox.checked = values.agoraCondense;
        }

        if (values.listeArticleCondensee === undefined) {
            listeArticleCondenseeCheckBox.checked = true;
            setListeArticleCondensee();
        } else {
            listeArticleCondenseeCheckBox.checked = values.listeArticleCondensee;
        }

        if (values.navigationCommentaires === undefined) {
            navigationCommentairesCheckBox.checked = true;
            setNavigationCommentaires();
        } else {
            navigationCommentairesCheckBox.checked = values.navigationCommentaires;
        }

        if (values.agoraReplie === undefined) {
            agoraReplieCheckBox.checked = false;
            setAgoraReplie();
        } else {
            agoraReplieCheckBox.checked = values.agoraReplie;
        }
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);