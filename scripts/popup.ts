const darkModeCheckBox = document.querySelector('input[name="dark-mode"]') as HTMLInputElement;

const setDarkMode = () => {
    const value = darkModeCheckBox.checked;
    (chrome ?? browser).storage.local.set({ darkMode: value });
}

darkModeCheckBox.addEventListener('change', setDarkMode);

const restoreOptions = () => {
    (chrome ?? browser).storage.local.get(['darkMode']).then((values) => {
        if (values.darkMode === undefined) {
            darkModeCheckBox.checked = true;
            (chrome ?? browser).storage.local.set({darkMode: true});
        } else {
            darkModeCheckBox.checked = values.darkMode;
        }
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);