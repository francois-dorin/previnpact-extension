const body = document.querySelector('body');

const setClass = (className: string, condition: boolean): void => {
  if (condition) {
    body.classList.add(className);
  } else {
    body.classList.remove(className);
  }
}

extensionRuntime.onChanged((changes) => {  
  for (let [key, { newValue }] of Object.entries(changes)) {
    if (key == 'darkMode') {
      setClass('dark-theme', newValue);
    }

    if(key == 'policeSansSerif') {
      setClass('font-sans-serif', newValue)      
    }

    if (key == 'texte-justifie') {
      setClass('texte-justifie', newValue);
    }

    if (key == 'avec-cesure') {
      setClass('avec-cesure', newValue);
    }
  }
}); 

const loadState = () => {
  extensionRuntime
    .getSettings(['darkMode', 'policeSansSerif'])
    .then(settings => {
      setClass('dark-theme', settings.darkMode);
      setClass('font-sans-serif', settings.policeSansSerif);      
      setClass('texte-justifie', settings.texteJustifie);      
      setClass('avec-cesure', settings.avecCesure);
    })
};

loadState();