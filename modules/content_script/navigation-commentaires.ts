interface ICommentState {
  getCommentaires: () => Element[],
  currentIndex: number
}  

const commentairesState: {
  enabled: boolean,
  commentairesNonLus: ICommentState,
  commentaires: ICommentState
} = {
  enabled: true,
  commentairesNonLus: null,
  commentaires: null
};

/**
 * Retourne true si l'élément actif est un input ou un textarea.
 * @returns 
 */
const isInInputElement = () => {
  return document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA';
}
  
const initNavigationCommentaires = () => {
  document.addEventListener('keyup', (event) => {
    
    if (commentairesState.enabled && isInInputElement() == false) {
      switch (event.key) {
        case 'ArrowRight':
          commentairesNextNonLu();
          break;
        case 'ArrowLeft':
          commentairesPrevNonLu();
          break;
        case '>':
          commentairesNext();
          break;
        case '<':
          commentairesPrev();
          break;
      }
    } 
  });
  
  commentairesState.commentairesNonLus = {
    getCommentaires: getCommentairesNonLu,
    currentIndex: -1
  };

  commentairesState.commentaires = {
    getCommentaires: getCommentaires,
    currentIndex: -1
  };  
};
  
/**
 * Récupère un tableau des commentaires non lu
 * @returns 
 */

const getCommentairesNonLu = () => {
  const nonLus = document.getElementsByClassName('new-comment');    
  const commentaires = [...nonLus].map(x => x.closest('.single-comment'));
  return commentaires;
}

/**
 * Récupère un tableau des commentaires, ordonné chronologiquement
 * 
 * Attention, l'ordre chronologique est basé sur l'ID du commentaire et non sur la date,
 * car la date n'est pas disponible dans la liste des commentaires.
 * @returns 
 */
const getCommentaires = () => {
  const coms = document.getElementsByClassName('single-comment');
  const commentaires = [...coms];
  sortCommentaires(commentaires);
  console.log('commentaires', commentaires, commentairesState);
  return commentaires;
}

/**
 * Retire la classe "selected" de tous les commentaires.
 */
const clearSelection = () => {
  const commentaires = getCommentaires();
  for(let i = 0; i < commentaires.length; i++) {
    commentaires[i].classList.remove('selected');  
  }
}

/**
 * Sélectionne un commentaire.
 * 
 * @param Element qui a la classe ".comment"
 */
const selectCommentaire = (commentaire: Element) => {    
  clearSelection();

  commentaire.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  commentaire.classList.add('selected');
}

/**
 * Récupère le prochain index d'un tableau.
 * @param array 
 * @param currentIndex 
 * @returns 
 */
const getNextIndex = (array: any[], currentIndex: number): number => {
  if (currentIndex < array.length - 1) {
    return currentIndex + 1;
  } else {
    return 0;
  }
}

/**
 * Réupère l'index précédent d'un tableau.
 * @param array 
 * @param currentIndex 
 * @returns 
 */
const getPrevIndex = (array: any[], currentIndex: number): number => {
  if (currentIndex > 0) {
    return currentIndex - 1;
  } else {
    return array.length - 1;
  }
}

  
  
/**
 * Récupère l'ID d'un commentaire.
 * @param commentaire : Element du DOM ayant l'attribut "id" sous la forme "comment-1234"
 * @returns 
 */
const getID = (commentaire: Element) => {
  const idAttr = commentaire.getAttribute('id');
  const id = idAttr ? idAttr.replace('comment-', '') : '';
  return parseInt(id);
};

/**
 * Fonction utilisée pour trier les commentaires par ordre chronologique (en
 * réalité ID croissant)).
 * @param commentaires : tableau d'élément du DOM ayant l'attribut "id" sous la forme "comment-1234"
 * @returns 
 */
const sortCommentaires = (commentaires: Element[]) => {
  return commentaires.sort((a, b) => {      
    const aID = getID(a);
    const bID = getID(b);
    if (aID > bID) return 1;
    if (aID < bID) return -1;
    return 0;
  });

};
  
/**
 * Sélectionne le commentaire suivant dans le tableau de commentaires.
 * @param state 
 */
const selectNextCommentaire = (state: ICommentState) => {
  const commentaires = state.getCommentaires();

  if (commentaires.length > 0) {  
    let commentaire;

    state.currentIndex = getNextIndex(commentaires, state.currentIndex);
    commentaire = commentaires[state.currentIndex];  
    selectCommentaire(commentaire);
  }
}

/**
 * Sélectionne le commentaire précédent dans le tableau de commentaires.
 * @param state
 */
const selectPrevCommentaire = (state: ICommentState) => {
  const commentaires = state.getCommentaires();

  if (commentaires.length > 0) {
    let commentaire;

    state.currentIndex = getPrevIndex(commentaires, state.currentIndex);
    commentaire = commentaires[state.currentIndex];
    selectCommentaire(commentaire);    
  }
}

/**
 * Sélectionne le commentaire suivant non lu.
 */
const commentairesNextNonLu = () => {
  selectNextCommentaire(commentairesState.commentairesNonLus);    
}

/**
 * Sélectionne le commentaire précédent non lu.
 */
const commentairesPrevNonLu = () => {
  selectPrevCommentaire(commentairesState.commentairesNonLus);
}

/**
 * Sélectionne le commentaire suivant.
 */
const commentairesNext = () => {
  selectNextCommentaire(commentairesState.commentaires);
}

/**
 * Sélectionne le commentaire précédent.
 */
const commentairesPrev = () => {
  selectPrevCommentaire(commentairesState.commentaires);
}
