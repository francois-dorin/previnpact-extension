const body = document.querySelector('body');
body.classList.add('dark-theme');
body.classList.add('font-sans-serif');

extensionRuntime.onChanged((changes) => {
  console.log('change', changes);
  
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

