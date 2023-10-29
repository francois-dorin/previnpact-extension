const darkModeCheckBox = document.querySelector('input[name="dark-mode"]') as HTMLInputElement;
const policeSansSerifCheckBox = document.querySelector('input[name="police-sans-serif"]') as HTMLInputElement;
const texteJustifieCheckBox = document.querySelector('input[name="texte-justifie"]') as HTMLInputElement;
const avecCesureCheckBox = document.querySelector('input[name="avec-cesure"]') as HTMLInputElement;
const ecranLargeCheckBox = document.querySelector('input[name="ecran-large"]') as HTMLInputElement;
const taillePoliceCheckBox = document.querySelector('input[name="taille-police"]') as HTMLInputElement;

const setDarkMode = () => {
    const value = darkModeCheckBox.checked;
    extensionRuntime.setSettings({ darkMode: value });
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

const setEcranLarge = () => {
    const value = ecranLargeCheckBox.checked;
    extensionRuntime.setSettings({ecranLarge: value});
}

const setTaillePolice = () => {
    const value = taillePoliceCheckBox.checked;
    extensionRuntime.setSettings({taillePolice: value});
}

darkModeCheckBox.addEventListener('change', setDarkMode);
policeSansSerifCheckBox.addEventListener('change', setPoliceSansSerif);
texteJustifieCheckBox.addEventListener('change',setTexteJustifie);
avecCesureCheckBox.addEventListener('change', setAvecCesure);
ecranLargeCheckBox.addEventListener('change', setEcranLarge);
taillePoliceCheckBox.addEventListener('change', setTaillePolice);

const restoreOptions = () => {
    extensionRuntime.getAllSettings().then((values) => {
        if (values.darkMode === undefined) {
            darkModeCheckBox.checked = true;
            setDarkMode();
        } else {
            darkModeCheckBox.checked = values.darkMode;
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

        if (values.ecranLarge === undefined) {
            ecranLargeCheckBox.checked = true;
            setEcranLarge();
        } else {
            ecranLargeCheckBox.checked = values.ecranLarge;
        }

        if (values.taillePolice === undefined) {
            taillePoliceCheckBox.checked = false;
            setTaillePolice();
        } else {
            taillePoliceCheckBox.checked = values.taillePolice;
        }
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);