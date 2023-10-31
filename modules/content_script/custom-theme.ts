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

    if (key == 'texteJustifie') {
      setClass('texte-justifie', newValue);
    }

    if (key == 'avecCesure') {
      setClass('avec-cesure', newValue);
    }

    if (key == 'ecranLarge') {
      setClass('ecran-large', newValue);  
    }

    if (key == 'taillePolice') {
      setClass('taille-police', newValue);
    }

    if (key == 'agoraCondense') {
      setClass('agora-condense', newValue);
    }
  }
}); 

const loadState = () => {
  extensionRuntime
    .getAllSettings()
    .then(settings => {
      setClass('dark-theme', settings.darkMode);
      setClass('font-sans-serif', settings.policeSansSerif);      
      setClass('texte-justifie', settings.texteJustifie);      
      setClass('avec-cesure', settings.avecCesure);
      setClass('ecran-large', settings.ecranLarge);
      setClass('taille-police', settings.taillePolice);
      setClass('agora-condense', settings.agoraCondense);
    })
};

loadState();