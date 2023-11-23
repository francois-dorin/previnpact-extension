  
  const commentairesState: {
    enabled: boolean,
    currentNonLuIndex: number,
    currentIndex: number;
    commentairesNonLus: null | HTMLCollectionOf<Element>,
    commentaires: null | HTMLCollectionOf<Element>
  } = {
    enabled: true,
    currentNonLuIndex: -1,
    currentIndex: -1,
    commentairesNonLus: null,
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
  
    /*
     * On récupère les commentaires non lus et les commentaires via getElementsByClassName,
     * qui retourne une HTMLCollection live, c'est-à-dire qui est mis à jour
     * automatique en cas de changement dans le DOM.
     * 
     * Pratique lors du rechargement des comentaires via AJAX par exemple.
     */
    commentairesState.commentairesNonLus = document.getElementsByClassName('new-comment');    
    commentairesState.commentaires = document.getElementsByClassName('single-comment');
  };
  
  /**
   * Récupère un tableau des commentaires non lu
   * @returns 
   */

  const getCommentairesNonLu = () => {
    const commentaires = [...commentairesState.commentairesNonLus].map(x => x.closest('.single-comment'));
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
    const commentaires = [...commentairesState.commentaires];
    sortCommentaires(commentaires);
    console.log('commentaires', commentaires, commentairesState);
    return commentaires;
  }

  /**
   * Retire la classe "selected" de tous les commentaires.
   */
  const clearSelection = () => {
    for(let i = 0; i < commentairesState.commentaires.length; i++) {
      commentairesState.commentaires[i].classList.remove('selected');  
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
   * Sélectionne le commentaire suivant non lu.
   */
  const commentairesNextNonLu = () => {
    const commentaires = getCommentairesNonLu();

    if (commentaires.length > 0) {  
      let commentaire;

      commentairesState.currentNonLuIndex = getNextIndex(commentaires, commentairesState.currentNonLuIndex);
      commentaire = commentaires[commentairesState.currentNonLuIndex];  
      selectCommentaire(commentaire);    
    }
  }
  
  /**
   * Sélectionne le commentaire précédent non lu.
   */
  const commentairesPrevNonLu = () => {
    const commentaires = getCommentairesNonLu();

    if (commentaires.length > 0) {
      let commentaire;

      commentairesState.currentNonLuIndex = getPrevIndex(commentaires, commentairesState.currentNonLuIndex);
      commentaire = commentaires[commentairesState.currentNonLuIndex];
      selectCommentaire(commentaire);    
    }
  }

  /**
   * Sélectionne le commentaire suivant.
   */
  const commentairesNext = () => {
    const commentaires = getCommentaires();

    if (commentaires.length > 0) {  
      let commentaire;

      commentairesState.currentIndex = getNextIndex(commentaires, commentairesState.currentIndex);
      commentaire = commentaires[commentairesState.currentIndex];  
      selectCommentaire(commentaire);    
    }
  }
  
  /**
   * Sélectionne le commentaire précédent.
   */
  const commentairesPrev = () => {
    const commentaires = getCommentaires();

    if (commentaires.length > 0) {
      let commentaire;

      commentairesState.currentIndex = getPrevIndex(commentaires, commentairesState.currentIndex);
      commentaire = commentaires[commentairesState.currentIndex];
      selectCommentaire(commentaire);    
    }    
  }
