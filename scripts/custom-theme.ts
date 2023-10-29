const body = document.querySelector('body');
body.classList.add('dark-theme');
body.classList.add('font-sans-serif');

console.log('custom-theme.js loaded', (chrome ?? browser));

(chrome ?? browser).storage.local.get(['darkMode'], (value) => {
    console.log('settings', value);
});

(chrome ?? browser).storage.local.onChanged.addListener((changes) => {
    console.log('settings changed', changes);
    
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      if (key == 'darkMode') {
        if (newValue) {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
      }
    }
  });

