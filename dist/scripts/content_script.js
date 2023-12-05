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
// function loadAjax() {
//     $("#comment-page").on("click", "#toggle-editor-button", function() {
//         $("#editor-wrap-0").empty();
//     });
//     function replyOrEdit(element: any, edit: boolean) {
//         var cid = element.attr("cid");
//         var prevcid = $("#comment-editor-wrapper").attr("cid");
//         $("#editor-wrap-" + prevcid).hide();
//         $("#reply-and-edit-" + prevcid).show();
//         $("#editor-wrap-" + cid).show();
//         $("#reply-editor").val("");
//         $("#comment-editor-wrapper").prependTo($("#editor-wrap-" + cid));
//         $("#comment-editor-wrapper").attr("cid", cid);
//         $("#comment-send-butt").attr("cid", cid);
//         $("#reply-and-edit-" + cid).hide();
//         if (edit) {
//             $("#comment-send-butt").attr("editid", cid);
//             var content = $('#comment-content-' + cid + " .comment-text-content").text();
//             $("#reply-editor").val(content);
//         } else {
//             $("#comment-send-butt").attr("editid", 0);
//         }
//         $("#reply-editor").focus();
//         $("#reply-editor")[0].setSelectionRange($("#reply-editor").val().length, $("#reply-editor").val().length);
//     }
//     $("#comment-page").on("click", ".edit", function() {
//         var elem = $(this);
//         replyOrEdit(elem, true);
//     })
//     $("#comment-page").on("click", ".reply", function() {
//         var elem = $(this);
//         replyOrEdit(elem, false);
//     });
//     $("#comment-page").on('click', ".cancel-button", function() {
//         var cid = $(this).attr("cid");
//         var prevcid = $("#comment-editor-wrapper").attr("cid");
//         $("#editor-wrap-" + prevcid).hide();
//         $("#reply-and-edit-" + prevcid).show();
//         $("#reply-editor").val("");
//         $("#comment-editor-wrapper").prependTo($("#editor-wrap-" + cid));
//     });
//     $("#comment-page").on("click", ".vertical-separator", function() {
//         var cid = $(this).attr("cid");
//         var containerIdToFind = "#subcomments-container-" + cid;
//         var container = $("#subcomments-container-" + cid);
//         if (container.is(":hidden")) {
//             container.show();
//             $(this).removeClass("something-to-hide");
//             $("#vertical-separator-plus-" + cid).hide();
//             $("#vertical-separator-minus-" + cid).show();
//         } else {
//             container.hide();
//             $(this).addClass("something-to-hide");
//             $("#vertical-separator-plus-" + cid).show();
//             $("#vertical-separator-minus-" + cid).hide();
//         }
//     })
//     $("#comment-page").on("click", ".send-button", function(event: any) {
//         var cid = $(this).attr("cid");
//         var editid = $(this).attr("editid");
//         if (editid > 0) {
//             try {
//                 let request =
//                     $.ajax({
//                         type: "POST",
//                         url: this.getAttribute("url"),
//                         data: {
//                             action: "edit_ajax_comment",
//                             comment_post_ID: $('#comment-page').attr("postId"),
//                             comment_ID: cid,
//                             content: $("#reply-editor").val(),
//                         },
//                         action: "edit_ajax_comment",
//                         dataType: 'json',
//                     });
//                 request.done(function(output: any) {
//                     //Code à jouer en cas d'éxécution sans erreur du script du PHP
//                     if (output.success) {
//                         //location.reload();const 
//                         // element = document.getElementById("loading-post");
//                         // element.removeChild();
//                         $("#comment-page").load(location.href + " #comment-page > *", reloadCommentaires);
//                     }
//                 });
//                 request.fail(function(error: any) {
//                     //Code à jouer en cas d'éxécution en erreur du script du PHP ou de ressource introuvable
//                 });
//                 request.always(function() {
//                     //Code à jouer après done OU fail quoi qu'il arrive
//                 });
//             } catch (e) {
//                 //alert(e, "edit");
//             }
//         } else {
//             try {
//                 let request = $.ajax({
//                     type: "POST",
//                     url: this.getAttribute("url"),
//                     data: {
//                         action: "post_ajax_comment",
//                         comment_post_ID: $('#comment-page').attr("postId"),
//                         comment_ID: cid,
//                         content: $("#reply-editor").val(),
//                     },
//                     action: "post_ajax_comment",
//                     dataType: 'json',
//                 });
//                 request.done(function(output: any) {
//                     // console.log(output);
//                     //Code à jouer en cas d'éxécution sans erreur du script du PHP
//                     if (output.success) {
//                         $("#comment-page").load(location.href + " #comment-page > *", reloadCommentaires);
//                         const url = "https://next.ink/wp-admin/admin-ajax.php";
//                         const data = {
//                             action: 'insert_or_update_count_diff',
//                             post_id: $('#comment-page').attr("postId"),
//                             last_comment_id: output.data.id,
//                         }
//                         $.ajax({
//                             url: url,
//                             type: 'POST',
//                             data: data,
//                             success: function(_data: any) {},
//                             error: function(_error: any) {}
//                         })
//                     }
//                 });
//                 request.fail(function(_error: any) {
//                 });
//                 request.always(function() {
//                 });
//             } catch (e) {
//                 //alert(e, 'addd');
//             }
//         }
//     });
//     $('.send-button').off('click');
// }
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
        hIcon = hCommentaire.querySelector('.comment-expend > img.avatar');
    }
    else {
        // Commentaire de niveau 1
        hIcon = hCommentaire.parentNode.parentNode.querySelector('.comment-expend > img.avatar');
    }
    return hIcon?.getAttribute('src') ?? hIcon?.getAttribute('data-src');
};
const getAuthorType = (hCommentaire) => {
    const hAuthorType = hCommentaire.querySelector('.author-tag');
    return hAuthorType?.textContent;
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
    const hDate = hCommentaire.querySelector('.ago');
    return hDate.textContent;
};
const getAuthor = (hCommentaire) => {
    const hAuthor = hCommentaire.querySelector('.pseudo-comment');
    return hAuthor.textContent;
};
const getAuthorClass = (hCommentaire) => {
    const hAuthor = hCommentaire.querySelector('.author-tag');
    return hAuthor?.classList?.item(1);
};
const getIsEditable = (hCommentaire) => {
    const hEdit = hCommentaire.querySelector('.edit');
    return hEdit !== null;
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
            isEditable: getIsEditable(hCommentaire)
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
<div class="comment byuser depth-1 single-comment" id="comment-${commentaire.id}">
    <div class="comment-expend">
        <img alt="" src="${commentaire.iconUrl}" srcset="${commentaire.iconUrl} 2x" class="avatar avatar-30 photo ls-is-cached lazyloaded" height="30" width="30" decoding="async">    <div class="vertical-separator nothing-ever-to-hide" hiding-things="0" cid="${commentaire.id}">
    </div>
</div>

<div class="comment-main">
    <div class="comment-info-pseudo">
        <div>
            <span class="pseudo-comment">${commentaire.author}</span>
            <span class="author-tag ${commentaire.authorClass}">${commentaire.authorType ?? ''}</span>                    
        </div>

    <div class="ago ago-${commentaire.id}">${commentaire.date}</div>
</div>

<div>
    <div class="comment-content" id="comment-content-${commentaire.id}">
        ${commentaire.quoteContent ? `<div class="quote-container">${commentaire.quoteContent}</div>` : ''}
        <div class="comment-text-content">${commentaire.content}</div>
        <div style="display:none;" class="add-comment" id="editor-wrap-${commentaire.id}">
    </div>

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
</div>
`;
    return div;
};
const clearEvents = () => {
    // if (jQuery) {
    //     $("#comment-page").off("click", ".edit");
    //     $("#comment-page").off("click", ".reply");
    //     $("#comment-page").off('click', ".cancel-button");
    //     $("#comment-page").off("click", ".vertical-separator");
    //     $("#comment-page").off("click", ".send-button");
    // }
};
const addEvents = () => {
    // if ($) {
    //     loadAjax();
    // }
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
    clearEvents();
    $("#comment-editor-wrapper").prependTo($("#editor-wrap-0")); // Pour être sur de conserver l'éditeur si jamais il était ouvert.
    ordreCommentairesState.container.replaceChild(newDOM, ordreCommentairesState.currentDOM);
    ordreCommentairesState.currentDOM = newDOM;
    addEvents();
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
    });
};
loadState();
initNavigationCommentaires();
