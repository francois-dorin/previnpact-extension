class ExtensionRuntime {
    browser;
    constructor() {
        this.browser = this.getBrowser();
    }
    setSettings(values) {
        this.browser.storage.local.set(values);
    }
    getSettings(keys) {
        const callback = (resolve, values) => {
            resolve(values);
        };
        const promise = new Promise((resolve) => {
            this.browser.storage.local.get(keys).then((values) => callback(resolve, values));
        });
        return promise;
    }
    getAllSettings() {
        const callback = (resolve, values) => {
            resolve(values);
        };
        const promise = new Promise((resolve) => {
            this.browser.storage.local.get().then((values) => callback(resolve, values));
        });
        return promise;
    }
    onChanged(callback) {
        this.browser.storage.local.onChanged.addListener(callback);
    }
    getUrlOfResource(resource) {
        return this.browser.runtime.getURL(resource);
    }
    getBrowser() {
        return (chrome ?? browser);
    }
}
const extensionRuntime = new ExtensionRuntime();
const commentairesState = {
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
};
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
};
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
};
/**
 * Retire la classe "selected" de tous les commentaires.
 */
const clearSelection = () => {
    const commentaires = getCommentaires();
    for (let i = 0; i < commentaires.length; i++) {
        commentaires[i].classList.remove('selected');
    }
};
/**
 * Sélectionne un commentaire.
 *
 * @param Element qui a la classe ".comment"
 */
const selectCommentaire = (commentaire) => {
    clearSelection();
    commentaire.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    commentaire.classList.add('selected');
};
/**
 * Récupère le prochain index d'un tableau.
 * @param array
 * @param currentIndex
 * @returns
 */
const getNextIndex = (array, currentIndex) => {
    if (currentIndex < array.length - 1) {
        return currentIndex + 1;
    }
    else {
        return 0;
    }
};
/**
 * Réupère l'index précédent d'un tableau.
 * @param array
 * @param currentIndex
 * @returns
 */
const getPrevIndex = (array, currentIndex) => {
    if (currentIndex > 0) {
        return currentIndex - 1;
    }
    else {
        return array.length - 1;
    }
};
/**
 * Récupère l'ID d'un commentaire.
 * @param commentaire : Element du DOM ayant l'attribut "id" sous la forme "comment-1234"
 * @returns
 */
const getID = (commentaire) => {
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
const sortCommentaires = (commentaires) => {
    return commentaires.sort((a, b) => {
        const aID = getID(a);
        const bID = getID(b);
        if (aID > bID)
            return 1;
        if (aID < bID)
            return -1;
        return 0;
    });
};
/**
 * Sélectionne le commentaire suivant dans le tableau de commentaires.
 * @param state
 */
const selectNextCommentaire = (state) => {
    const commentaires = state.getCommentaires();
    if (commentaires.length > 0) {
        let commentaire;
        state.currentIndex = getNextIndex(commentaires, state.currentIndex);
        commentaire = commentaires[state.currentIndex];
        selectCommentaire(commentaire);
    }
};
/**
 * Sélectionne le commentaire précédent dans le tableau de commentaires.
 * @param state
 */
const selectPrevCommentaire = (state) => {
    const commentaires = state.getCommentaires();
    if (commentaires.length > 0) {
        let commentaire;
        state.currentIndex = getPrevIndex(commentaires, state.currentIndex);
        commentaire = commentaires[state.currentIndex];
        selectCommentaire(commentaire);
    }
};
/**
 * Sélectionne le commentaire suivant non lu.
 */
const commentairesNextNonLu = () => {
    selectNextCommentaire(commentairesState.commentairesNonLus);
};
/**
 * Sélectionne le commentaire précédent non lu.
 */
const commentairesPrevNonLu = () => {
    selectPrevCommentaire(commentairesState.commentairesNonLus);
};
/**
 * Sélectionne le commentaire suivant.
 */
const commentairesNext = () => {
    selectNextCommentaire(commentairesState.commentaires);
};
/**
 * Sélectionne le commentaire précédent.
 */
const commentairesPrev = () => {
    selectPrevCommentaire(commentairesState.commentaires);
};
const menuTalk = () => {
    const litsheart = document.getElementById('list-heart');
    const talk = document.getElementById('talk');
    litsheart?.classList.toggle("close-talk");
    talk?.classList.toggle('close-heart-talk');
};
const body = document.querySelector('body');
body.id = 'previnpact-extension';
const setClass = (className, condition) => {
    if (condition) {
        body.classList.add(className);
    }
    else {
        body.classList.remove(className);
    }
};
const setData = (dataName, value) => {
    if (value && value != "default") {
        body.setAttribute(`data-${dataName}`, value);
    }
    else {
        body.removeAttribute(`data-${dataName}`);
    }
};
extensionRuntime.onChanged((changes) => {
    for (let [key, { newValue }] of Object.entries(changes)) {
        if (key == 'theme') {
            setClass('previnpact-theme', newValue);
            setClass('theme-orange', newValue);
        }
        if (key == 'policeSansSerif') {
            setClass('font-sans-serif', newValue);
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
        if (settings.agoraReplie) {
            menuTalk();
        }
    });
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
};
loadState();
init404();
initNavigationCommentaires();
