const darkModeCheckBox = document.querySelector('input[name="dark-mode"]') as HTMLInputElement;
const policeSansSerifCheckBox = document.querySelector('input[name="police-sans-serif"]') as HTMLInputElement;

const setDarkMode = () => {
    const value = darkModeCheckBox.checked;
    extensionRuntime.setSettings({ darkMode: value });
}

const setPoliceSansSerif = () => {
    const value = policeSansSerifCheckBox.checked;
    extensionRuntime.setSettings({policeSansSerif: value});
}

darkModeCheckBox.addEventListener('change', setDarkMode);
policeSansSerifCheckBox.addEventListener('change', setPoliceSansSerif);


const restoreOptions = () => {
    extensionRuntime.getSettings(['darkMode', 'policeSansSerif']).then((values) => {
        if (values.darkMode === undefined) {
            darkModeCheckBox.checked = true;
            extensionRuntime.setSettings({darkMode: true});
        } else {
            darkModeCheckBox.checked = values.darkMode;
        }

        if (values.policeSansSerif === undefined) {
            policeSansSerifCheckBox.checked = false;
            extensionRuntime.setSettings({policeSansSerif: false});
        } else {
            policeSansSerifCheckBox.checked = values.policeSansSerif;
        }
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);