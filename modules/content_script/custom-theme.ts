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
      setClass('dark-theme', settings.darkMode);
      setClass('font-sans-serif', settings.policeSansSerif);      
      setClass('texte-justifie', settings.texteJustifie);      
      setClass('avec-cesure', settings.avecCesure);
      //setClass('ecran-large', settings.ecranLarge);
      setClass('taille-police', settings.taillePolice);
      setClass('agora-condense', settings.agoraCondense);
      setClass('liste-article-condensee', settings.listeArticleCondensee);
      commentairesState.enabled = settings.navigationCommentaires;
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

const commentairesState: {
  enabled: boolean,
  currentIndex: number,
  commentaires: null | HTMLCollectionOf<Element>
} = {
  enabled: true,
  currentIndex: -1,
  commentaires: null
};

const isInInputElement = () => {
  return document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA';
}

const initNavigationCommentaires = () => {
  document.addEventListener('keyup', (event) => {
    
    if (commentairesState.enabled && isInInputElement() == false) {
      switch (event.key) {
        case 'ArrowRight':
          commentairesNext();
          break;
        case 'ArrowLeft':
          commentairesPrev();
          break;
      }
    } 
  });

  commentairesState.commentaires = document.getElementsByClassName('new-comment');
};

const selectCommentaire = (commentaire: Element) => {
  const container = commentaire.closest('.comment-main');

  for(let i = 0; i < commentairesState.commentaires.length; i++) {
    commentairesState.commentaires[i].closest('.comment-main').classList.remove('selected');  
  }

  container.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  container.classList.add('selected');
}

const commentairesNext = () => {
  if (commentairesState.commentaires && commentairesState.commentaires.length > 0) {  
    if (commentairesState.currentIndex < commentairesState.commentaires.length - 1) {
      commentairesState.currentIndex++;
    } else {
      commentairesState.currentIndex = 0;
    }

    selectCommentaire(commentairesState.commentaires[commentairesState.currentIndex]);    
  }
}

const commentairesPrev = () => {
  if (commentairesState.commentaires && commentairesState.commentaires.length > 0) {
    if (commentairesState.currentIndex > 0) {
      commentairesState.currentIndex--;
    } else {
      commentairesState.currentIndex = commentairesState.commentaires.length - 1;
    }

    selectCommentaire(commentairesState.commentaires[commentairesState.currentIndex]);    
  }
}

loadState();
init404();
initNavigationCommentaires();