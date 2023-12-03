const menuTalk = () => {
  const litsheart = document.getElementById('list-heart');
  const talk = document.getElementById('talk');
  litsheart?.classList.toggle("close-talk");
  talk?.classList.toggle('close-heart-talk')
}

const body = document.querySelector('body');
body.id = 'previnpact-extension';
const setClass = (className: string, condition: boolean): void => {
  if (condition) {
    body.classList.add(className);
  } else {
    body.classList.remove(className);
  }
}
const setData = (dataName: string, value: string): void => {
  if (value && value != "default") {    
    body.setAttribute(`data-${dataName}`, value);
  } else {
    body.removeAttribute(`data-${dataName}`);
  }
}

extensionRuntime.onChanged((changes) => {  
  for (let [key, { newValue }] of Object.entries(changes)) {
    if (key == 'theme') {
      setClass('previnpact-theme', newValue);
      setClass('theme-orange', newValue);
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
      setClass('ecran-large', newValue && newValue != "default");  
      setData('ecran-large', newValue);
    }

    if (key == 'taillePolice') {
      setClass('taille-police', newValue);
    }

    if (key == 'agoraCondense') {
      setClass('agora-condense', newValue);
    }

    if (key == 'listeArticleCondensee') {
      setClass('liste-article-condensee', newValue);
    }

    if (key == 'navigationCommentaires') {
      commentairesState.enabled = newValue;
    }

    if (key == 'ordreCommentaires') {
      setOrdreCommentaires(newValue);
    }
  }
}); 

const loadState = () => {
  extensionRuntime
    .getAllSettings()
    .then(settings => {
      setClass('previnpact-theme', settings.theme);
      setClass('theme-orange', settings.theme);
      setClass('font-sans-serif', settings.policeSansSerif);      
      setClass('texte-justifie', settings.texteJustifie);      
      setClass('avec-cesure', settings.avecCesure);
      setClass('ecran-large', settings.ecranLarge && settings.ecranLarge != "default");
      setData('ecran-large', settings.ecranLarge);
      setClass('taille-police', settings.taillePolice);
      setClass('agora-condense', settings.agoraCondense);
      setClass('liste-article-condensee', settings.listeArticleCondensee);      
      commentairesState.enabled = settings.navigationCommentaires;
      setOrdreCommentaires(settings.ordreCommentaires);

      if (settings.agoraReplie) {
        menuTalk();
      }
    })
};

loadState();
initNavigationCommentaires();