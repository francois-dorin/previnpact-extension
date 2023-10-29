const darkModeCheckBox = document.querySelector('input[name="dark-mode"]') as HTMLInputElement;
const policeSansSerifCheckBox = document.querySelector('input[name="police-sans-serif"]') as HTMLInputElement;
const texteJustifieCheckBox = document.querySelector('input[name="texte-justifie"]') as HTMLInputElement;
const avecCesureCheckBox = document.querySelector('input[name="avec-cesure"]') as HTMLInputElement;

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

darkModeCheckBox.addEventListener('change', setDarkMode);
policeSansSerifCheckBox.addEventListener('change', setPoliceSansSerif);
texteJustifieCheckBox.addEventListener('change',setTexteJustifie);
avecCesureCheckBox.addEventListener('change', setAvecCesure);

const restoreOptions = () => {
    extensionRuntime.getSettings(['darkMode', 'policeSansSerif']).then((values) => {
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
        }

        if (values.avecCesure === undefined) {
            avecCesureCheckBox.checked = true;
            setAvecCesure();
        }

    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);