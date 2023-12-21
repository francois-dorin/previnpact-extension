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
const getImageURL = (hCommentaire) => {
    let hIcon;
    if (hCommentaire.closest('.subcomments-container')) {
        // Sous-commentaire
        hIcon = hCommentaire.querySelector('.comment-expend > div > img.avatar');
    }
    else {
        // Commentaire de niveau 1
        hIcon = hCommentaire.closest('.parent-comment').querySelector('.comment-expend > div > img.avatar');
    }
    return hIcon?.getAttribute('src') ?? hIcon?.getAttribute('data-src');
};
const getAuthorType = (hCommentaire) => {
    let hAuthorType;
    if (hCommentaire.closest('.subcomments-container')) {
        hAuthorType = hCommentaire.querySelector('.author-tag');
    }
    else {
        hAuthorType = hCommentaire.closest('.parent-comment').querySelector('.author-tag');
    }
    return hAuthorType?.textContent;
};
const isNewComment = (hCommentaire) => {
    const hNew = hCommentaire.querySelector('.new-comment');
    return hNew !== null;
};
const getContent = (hCommentaire) => {
    const hcontent = hCommentaire.querySelector('.comment-text-content');
    return hcontent.innerHTML;
};
const getQuoteContent = (hCommentaire) => {
    const hcontent = hCommentaire.querySelector('.quote-container');
    return hcontent?.innerHTML;
};
const getDate = (hCommentaire) => {
    let hDate;
    if (hCommentaire.closest('.subcomments-container')) {
        hDate = hCommentaire.querySelector('.ago');
    }
    else {
        hDate = hCommentaire.closest('.parent-comment')?.querySelector('.ago');
    }
    return hDate?.textContent;
};
const getAuthor = (hCommentaire) => {
    let hAuthor;
    if (hCommentaire.closest('.subcomments-container')) {
        hAuthor = hCommentaire.querySelector('.pseudo-comment');
    }
    else {
        hAuthor = hCommentaire.closest('.parent-comment')?.querySelector('.pseudo-comment');
    }
    return hAuthor?.textContent;
};
const getAuthorClass = (hCommentaire) => {
    let hAuthor;
    if (hCommentaire.closest('.subcomments-container')) {
        hAuthor = hCommentaire.querySelector('.author-tag');
    }
    else {
        hAuthor = hCommentaire.closest('.parent-comment')?.querySelector('.author-tag');
    }
    return hAuthor?.classList?.item(1);
};
const getIsEditable = (hCommentaire) => {
    const hEdit = hCommentaire.querySelector('.edit');
    return hEdit !== null;
};
const getArchor = (hCommentaire) => {
    let hArchor;
    if (hCommentaire.closest('.subcomments-container')) {
        hArchor = hCommentaire.querySelector('.archor');
    }
    else {
        hArchor = hCommentaire.closest('.parent-comment')?.querySelector('.archor');
    }
    return hArchor?.textContent;
};
const getCommentairesFromDOM = () => {
    const hCommentaires = document.querySelectorAll('.comment');
    const list = [];
    for (let i = 0; i < hCommentaires.length; i++) {
        const hCommentaire = hCommentaires[i];
        const commentaire = {
            id: getID(hCommentaire),
            iconUrl: getImageURL(hCommentaire),
            authorType: getAuthorType(hCommentaire),
            content: getContent(hCommentaire),
            quoteContent: getQuoteContent(hCommentaire),
            date: getDate(hCommentaire),
            author: getAuthor(hCommentaire),
            authorClass: getAuthorClass(hCommentaire),
            isEditable: getIsEditable(hCommentaire),
            archor: getArchor(hCommentaire),
            newComment: isNewComment(hCommentaire)
        };
        list.push(commentaire);
    }
    return list;
};
const getInitialState = () => {
    return {
        ordre: 'default',
        initialDOM: document.querySelector('#comment-page > .comments-list'),
        currentDOM: document.querySelector('#comment-page > .comments-list'),
        container: document.querySelector('#comment-page'),
        commentaires: getCommentairesFromDOM()
    };
};
let ordreCommentairesState = getInitialState();
const sortCommentairesOrdreChronologique = (commentaires) => {
    return commentaires.sort((a, b) => {
        if (a.id > b.id)
            return 1;
        if (a.id < b.id)
            return -1;
        return 0;
    });
};
const sortCommentairesOrdreAnteChronologique = (commentaires) => {
    return commentaires.sort((a, b) => {
        if (a.id < b.id)
            return 1;
        if (a.id > b.id)
            return -1;
        return 0;
    });
};
const buttonReagirClick = (event) => {
    const commentId = event.currentTarget.getAttribute('cid'); //event.target .data('cid');
    const emojiList = document.getElementById('emoji-react-list-' + commentId);
    if (emojiList.classList.contains('hiding-emojis')) {
        emojiList.classList.remove('hiding-emojis');
        emojiList.classList.add('showing-emojis');
        getEmojiReactions(parseInt(commentId));
    }
    else {
        emojiList.classList.remove('showing-emojis');
        emojiList.classList.add('hiding-emojis');
    }
};
const addEmojiReaction = (commentId, emoji) => {
    const formData = new FormData();
    formData.append('action', 'set_emoji_reaction');
    formData.append('comment_id', commentId.toString());
    formData.append('reaction_emoji', emoji);
    fetch('https://next.ink/wp-admin/admin-ajax.php', {
        method: 'POST',
        body: formData
    }).then(async (response) => {
        if (response.ok) {
            const json = await response.json();
            setEmojiReactionsHtml(commentId, json);
        }
        else {
            throw new Error('Erreur lors de la récupération des réactions emoji');
        }
    });
};
const setEmojiReactionsHtml = (commentId, reactions) => {
    const reactionList = document.getElementById('emoji-react-list-' + commentId);
    reactionList.innerHTML = '';
    reactions.forEach((reaction) => {
        const button = document.createElement('button');
        button.textContent = reaction.emoji + ' ' + (reaction.count > 99 ? '99+' : reaction.count);
        button.className = reaction.count > 0 ? 'used' : 'unused';
        if (reaction.current_user_emoji) {
            button.className += ' your-reaction';
        }
        button.setAttribute('data-emoji', reaction.emoji);
        button.setAttribute('data-comment-id', commentId.toString());
        button.addEventListener('click', function () {
            addEmojiReaction(commentId, reaction.emoji);
        });
        // Ajoutez le bouton à la div 'emoji-reaction-list'
        reactionList.appendChild(button);
    });
};
const getEmojiReactions = (commentId) => {
    const formData = new FormData();
    formData.append('action', 'post_get_comment_reactions');
    formData.append('comment_id', commentId.toString());
    fetch('https://next.ink/wp-admin/admin-ajax.php', {
        method: 'POST',
        body: formData
    }).then(async (response) => {
        if (response.ok) {
            const json = await response.json();
            setEmojiReactionsHtml(commentId, json);
        }
        else {
            throw new Error('Erreur lors de la récupération des réactions emoji');
        }
    });
};
const createDOMForCommentaire = (commentaire) => {
    const div = document.createElement('div');
    const editDiv = `
<div class="edit" id="edit-${commentaire.id}" cid="${commentaire.id}">
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.42188 15.5771H14.0006" stroke="#6B6B6B" style="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M6.48393 12.1099L2.59473 13.2235L3.70834 9.33428L11.2168 1.82585C11.7567 1.28592 12.6257 1.28592 13.1656 1.82585L14.0008 2.66106C14.5407 3.20099 14.5407 4.06994 14.0008 4.60987L6.48393 12.1099Z" stroke="#6B6B6B" style="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M12.8786 5.71504L10.103 2.93945" stroke="#6B6B6B" style="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
    <span class="edit-button">Éditer</span>
</div>`;
    div.innerHTML = `
<div class="parent-comment" id="parent-comment-${commentaire.id}">
    <div class="comment-expend">
        <div>
            <img alt="" src="${commentaire.iconUrl}" srcset="${commentaire.iconUrl} 2x" class="avatar avatar-50 photo ls-is-cached lazyloaded" height="50" width="50" decoding="async">        <div class="info-comment">
        <div class="status-compte">
            <span class="pseudo-comment">${commentaire.author}</span>
                                                <span class="separator-point"></span>
                                <span class="author-tag ${commentaire.authorClass}">
                                ${commentaire.authorType ?? ''}
                                </span>
                                        </div>
            <span class="separator-point"></span>
            <div class="ago ago-${commentaire.id}">${commentaire.date}</div>
        </div>
    </div>
    <div>
        <p class="archor">${commentaire.archor}</p>
    </div>
    </div>
    <div class="comment-solo enter-other-comment">
    <div>
        <div class="comment byuser comment-author-Kazer20 odd alt thread-odd thread-alt depth-1  single-comment" id="comment-${commentaire.id}">
            <div class="comment-main">
                <div>
                    <div class="comment-content" id="comment-content-${commentaire.id}">
                        <div class="comment-text-content">${commentaire.content}</div>        
                    </div>
                    <div style="display:none;" class="add-comment" id="editor-wrap-${commentaire.id}"></div>
                    <div class="editor-wrap" id="editor-subwrap-${commentaire.id}"></div>
                </div>
                <div class="button-reply-and-edit">
                    <div class="reply-and-edit" id="reply-and-edit-${commentaire.id}">
                        <div class="reply" id="reply-${commentaire.id}" cid="${commentaire.id}">
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.9299 13.0035C14.5949 12.3755 15.1305 11.6089 15.4815 10.7685C15.8417 9.9188 16.0171 9.01371 15.9987 8.09014C15.9987 4.28506 12.7385 1.18188 8.56399 1.18188C4.38948 1.18188 1 4.28506 1 8.09014C1 11.8952 4.38948 14.9984 8.57322 14.9984C9.31208 14.9984 10.0509 14.8968 10.7713 14.7029C10.9837 14.8876 11.2146 15.0631 11.464 15.2201C12.443 15.8573 13.4958 16.1806 14.6041 16.1806C14.8073 16.1806 14.9735 16.079 15.0474 15.9127C15.0844 15.8388 15.1028 15.7557 15.0936 15.6634C15.0936 15.5802 15.0566 15.4971 15.0105 15.4325C14.4748 14.7121 14.1054 13.8717 13.9391 12.985V13.0035H13.9299Z" stroke="#6B6B6B" style="" stroke-width="1.5" stroke-linejoin="round"></path>
                            </svg>
                            <span class="reply-button">Répondre</span>
                        </div>
                    </div>
                    ${commentaire.isEditable ? editDiv : ''}
                    <div class="emoji-react" id="emoji-react-${commentaire.id}" open="0" cid="${commentaire.id}">
                        <svg width="100%" height="100%" viewBox="0 0 29 29" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
                            <path d="M14.4,27.6c-7.285,0 -13.2,-5.915 -13.2,-13.2c-0,-7.285 5.915,-13.2 13.2,-13.2c7.285,-0 13.2,5.915 13.2,13.2" style="fill:none;stroke:#000;stroke-width:2px;"></path>
                            <path d="M15.84,16.32l-8.867,-0c-0.009,0.119 -0.013,0.239 -0.013,0.36c-0,3.025 2.803,5.519 6.401,5.844" style="fill:none;stroke:#000;stroke-width:1.5px;"></path>
                            <path d="M6.24,9.84l2.4,-2.4l2.36,2.36" style="fill:none;stroke:#000;stroke-width:1.5px;"></path>
                            <path d="M17.52,9.84l2.4,-2.4l2.36,2.36" style="fill:none;stroke:#000;stroke-width:1.5px;"></path>
                            <path d="M22.08,18.336l-0,7.488" style="fill:none;stroke:#000;stroke-width:1.5px;"></path>
                            <path d="M18.336,22.08l7.488,-0" style="fill:none;stroke:#000;stroke-width:1.5px;"></path>
                            <circle cx="22.08" cy="22.08" r="6.24" style="fill:none;stroke:#000;stroke-width:1.5px;"></circle>
                        </svg>                    
                        <span class="emoji-react-button">Réagir</span>
                    </div>
                </div>
                <div class="emoji-reaction-list hiding-emojis" id="emoji-react-list-${commentaire.id}" cid="${commentaire.id}">                    
                </div>
            </div>
        </div>
    </div>
</div>`;
    div.querySelector('.emoji-react')?.addEventListener('click', buttonReagirClick);
    return div;
};
const createDOM = (commentaires) => {
    const divCommentsList = document.createElement('div');
    divCommentsList.classList.add('comments-list');
    for (let i = 0; i < commentaires.length; i++) {
        const commentaire = commentaires[i];
        const divCommentaire = createDOMForCommentaire(commentaire);
        divCommentsList.appendChild(divCommentaire);
    }
    return divCommentsList;
};
const setNewDOM = (newDOM) => {
    const editorWrapper = document.getElementById('comment-editor-wrapper');
    const container = document.getElementById('editor-wrap-0');
    container.prepend(editorWrapper); // Pour être sur de conserver l'éditeur si jamais il était ouvert.
    ordreCommentairesState.container.replaceChild(newDOM, ordreCommentairesState.currentDOM);
    ordreCommentairesState.currentDOM = newDOM;
};
const ordreChronologique = () => {
    const commentaires = [...ordreCommentairesState.commentaires];
    let newDOM;
    sortCommentairesOrdreChronologique(commentaires);
    newDOM = createDOM(commentaires);
    setNewDOM(newDOM);
};
const ordreAnteChronologique = () => {
    const commentaires = [...ordreCommentairesState.commentaires];
    let newDOM;
    sortCommentairesOrdreAnteChronologique(commentaires);
    newDOM = createDOM(commentaires);
    setNewDOM(newDOM);
};
const defaultOrder = () => {
    setNewDOM(ordreCommentairesState.initialDOM);
};
const setHeaderDataReloaded = () => {
    const commentPage = document.querySelector('#comment-page');
    const commentHeader = commentPage?.querySelector('.comments-header');
    commentHeader?.setAttribute('data-reloaded', 'true');
};
const setOrdreCommentaires = (ordre) => {
    if (ordreCommentairesState.container) {
        ordreCommentairesState.ordre = ordre;
        switch (ordre) {
            case 'chronologique':
                ordreChronologique();
                break;
            case 'antechronologique':
                ordreAnteChronologique();
                break;
            default:
                defaultOrder();
        }
        setHeaderDataReloaded();
    }
};
const observeDOM = (function () {
    const MutationObserver = window.MutationObserver;
    return function (obj, callback) {
        if (!obj || obj.nodeType !== Node.ELEMENT_NODE)
            return;
        if (MutationObserver) {
            // define a new observer
            const mutationObserver = new MutationObserver(callback);
            // have the observer observe for changes in children
            mutationObserver.observe(obj, { childList: true, subtree: true });
            return mutationObserver;
        }
    };
})();
const reloadCommentaires = () => {
    const ordre = ordreCommentairesState.ordre;
    ordreCommentairesState = getInitialState();
    ordreCommentairesState.ordre = ordre;
    setOrdreCommentaires(ordreCommentairesState.ordre);
};
const commentairesNeedReload = () => {
    const commentPage = document.querySelector('#comment-page');
    const commentHeader = commentPage?.querySelector('.comments-header');
    if (commentHeader && commentHeader.getAttribute('data-reloaded') !== 'true') {
        setHeaderDataReloaded();
        reloadCommentaires();
    }
};
const initObserveCommentChange = () => {
    const commentPage = document.querySelector('#comment-page');
    observeDOM(commentPage, commentairesNeedReload);
};
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initObserveCommentChange);
}
else {
    initObserveCommentChange();
}
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
        if (key == 'ordreCommentaires') {
            setOrdreCommentaires(newValue);
        }
        if (key == 'logoSansBeta') {
            setClass('logo-sans-beta', newValue);
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
        setClass('logo-sans-beta', settings.logoSansBeta);
        commentairesState.enabled = settings.navigationCommentaires;
        setOrdreCommentaires(settings.ordreCommentaires);
        if (settings.agoraReplie) {
            menuTalk();
        }
    });
};
loadState();
initNavigationCommentaires();
