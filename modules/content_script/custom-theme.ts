const body = document.querySelector('body');

extensionRuntime.onChanged((changes) => {  
  for (let [key, { newValue }] of Object.entries(changes)) {
    if (key == 'darkMode') {
      if (newValue) {
          body.classList.add('dark-theme');
      } else {
          body.classList.remove('dark-theme');
      }
    }

    if(key == 'policeSansSerif') {
      if (newValue) {
        body.classList.add('font-sans-serif');
      } else {
        body.classList.remove('font-sans-serif');
      }
    }
  }
}); 

const loadState = () => {
  extensionRuntime
    .getSettings(['darkMode', 'policeSansSerif'])
    .then(settings => {
      if (settings.darkMode) {
        body.classList.add('dark-theme');
      } else {
        body.classList.remove('dark-theme');
      }

      if (settings.policeSansSerif) {
        body.classList.add('font-sans-serif');
      } else {
        body.classList.remove('font-sans-serif');
      }
    })
};

loadState();