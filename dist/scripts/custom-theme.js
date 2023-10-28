const body = document.querySelector('body');
body.classList.add('dark-theme');
console.log('custom-theme.js loaded', (chrome ?? browser));

(chrome ?? browser).storage.local.onChanged.addListener((changes) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key == 'darkMode') {
            if (newValue) {
                body.classList.add('dark-theme');
            }
            else {
                body.classList.remove('dark-theme');
            }
        }
    }
});
