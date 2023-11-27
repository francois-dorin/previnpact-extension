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
      //setClass('ecran-large', newValue);  
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
      //setClass('ecran-large', settings.ecranLarge);
      setClass('taille-police', settings.taillePolice);
      setClass('agora-condense', settings.agoraCondense);
      setClass('liste-article-condensee', settings.listeArticleCondensee);
      commentairesState.enabled = settings.navigationCommentaires;

      if (settings.agoraReplie) {
        menuTalk();
      }
    })
};

const init404 = () => {
  const main = body.querySelector('main');
  if (main && main.innerText == '' && main.id != 'video-travolta-404') {    
    const video = document.createElement('video');
    const source = document.createElement('source');
    source.setAttribute('type', 'video/mp4');
    source.setAttribute('src', extensionRuntime.getUrlOfResource("/modules/content_script/assets/images/travolta_404_nxi_sombre.mp4"));

    main.id = "video-travolta-404";
    video.appendChild(source);
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    
    main.appendChild(video);
    
  }
}


loadState();
init404();
initNavigationCommentaires();