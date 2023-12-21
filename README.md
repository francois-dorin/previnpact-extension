# Description du projet

Cette extension pour les navigateurs Chrome / Firefox offre des fonctionnalités de personnalisation supplémentaires pour le site Next (anciennement NextINpact), et notamment :
- [x] [gestion de l'alignement du texte (justifié / avec césure / aligné à gauche)](docs/alignement-texte.md) ;
- [x] [gestion des écrans larges](docs/ecran-large.md) ;
- [x] changement de la taille de la police (15px comme sur l'ancien site) ;
- [x] [condensation de l'Agora](docs/agora.md) ;
- [x] [condensation de la liste des articles](docs/liste-article.md) ;
- [x] navigation dans les commentaires non-lu en utilisant les flèches gauche et droite ;
- [x] navigation dans les commentaires par ordre chronologique en utilisant les touches < et > ;

Ce projet est un projet personnel, aucunement lié à l'équipe de Next.

Vous pouvez également retrouver la liste des [fonctionnalités abandonnées ici](docs/fonctionnalites-abandonnees.md).

# Genèse du projet

A la base, le projet avait surtout une vertue pédagogique : créer une extension pour navigateur, qui sorte du cadre du classique "Hello World!".

Cela faisait un certain temps que je souhaitais mettre un peu le nez la-dedans, sans vraiment avoir eu l'occasion de le faire. La reprise de NextINpact, le changement d'identité, ce fut pour moi l'occasion de le faire.

Le nom de l'extension, PrevINpact, est un trait d'esprit faisant référence au nom de NextINpact bien évidemment, mais marquant aussi une certaine résistance au changement fasse à certaines fonctionnalités manquantes lors des premières versions du nouveau site (je dois l'avouer), comme le thème sombre (qui a été officiellement ajouté depuis, merci aux équipes de Next !).

Le projet a plus à certains membre, qui l'on "adopté". J'en ai alors profité pour y inclure d'autres suggestions lorsque cela me paraissait tout à fait pertinent.

# Support

Attention, les fonctionnalités de l'extension peuvent se retrouver cassées à n'importe quel moment. N'étant pas une extension officielle, toute mise-à-jour du site de Next est susceptible d'entrainer l'arrêt et / ou des bogues d'une ou de plusieurs fonctionnalités.

# Installation
## Via le store
Vous pouvez installer les applications en passant par les stores :
- Chrome : https://chrome.google.com/webstore/detail/prev-inpact/bbodaagihddcjoiomghmcfllkppkcjoj (attention, il faut utiliser le lien car l'extension n'apparait pas volontaire dans les résultats de recherche)
- Firefox : https://addons.mozilla.org/fr/firefox/addon/prev-inpact/ (j'ai publié volontairement aussi l'extension en mode expérimental, à défaut de ne pas pouvoir choisir de ne pas le publier sur le moteur de recherche)

## Manuellement 

### Télécharger l'extension

Si vous avez Git sur votre poste, utilisez l'option 1 "git clone" dans le répertoire de votre choix. A défaut, utilisez l'option 2 "Download Zip" pour récupérer le code.

![image](/assets/screenshots/download.png)

### Sous Firefox
Les informations sont disponibles ici : https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing

Rapidement :
- ouvrir l'url "about:debugging"
- cliquer sur "Ce firefox"
- cliquer sur "Charger une extension temporaire"
- Sélectionner le fichier "manifest.json"
- Visiter la page https://beta.next.ink

N'oubliez pas d'activer l'extension !

### Sous Chrome

Les informations sont disponibles ici : https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked

Rapidement :
- ouvrir l'url "chrome://extensions"
- activer le mode développeur
- cliquer sur "Charger l'extension non empaquetée"
- sélectionner le répertoire où se trouve l'extension (cf étape Télécharger l'extension)

Et voilà !

# Liste des contributeurs

Un grand merci aux différents contributeurs :
- [Artist-on-line](https://github.com/Artist-on-line) (DantonQ-Robespierre sur Next)
- [Seb](https://github.com/Wivik) (SebGF sur Next)