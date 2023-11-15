# Hands on React

## Lancer le projet

```sh
npm i
npm run dev
```

## Les étapes

### Etape 0

Afficher un menu avec un tableau d'artistes (uniquement les données du fichier Artist.json) à  l'aide de JS.

Bonus :

- Afficher le nombre d'albums réalisés par chaque artiste dans le tableau
- Rendre le code de création du menu, et du tableau plus générique

Points vu dans cette étape :

- C'est fastidieux


### Étape 1

Passer d'un tableau d'artiste HTML / JS à un composant ArtistTable en JSX.

Dans un premier temps juste les noms / nombre d'albums.

Points vus dans cette étape :

- Insertion de variable JS dans le JSX (bandeau "# artists" en haut du tableau)
- Parcours de tableau pour générer un bout de JSX par élément
- Affichage conditionnel (si 0 albums on veut afficher le texte "No albums" au lieu de 0)

### Etape 2

Filtre sur le tableau
Composant de la vue d'un seul artiste.

On veut le nom du groupe + les noms des albums

Points vus dans cette étape :

- Utilisation du state
- affichage conditionnel

Bonus :

- On n'affiche le bouton détails dans le tableau uniquement quand on a un filtre d'activé


### Étape 2 bis

Composant de la vue d'un seul artiste sur une page séparée

On veut le nom du groupe + les noms des albums

Points vus dans cette étape :

- On consolide les points vu précédemment sur le templating et l'affichage d'un tableau JS
- Mise en place d'un router
- Les liens avec react-router
- Les paramètres de route et leur récupération

### Étape 3

Enrichir le composant de vue des artistes avec l'image de la pochette (la fonction global `albumArt` est à utiliser, à voir si on l'abstrait pour éviter l'effet WTF).

Points vus dans cette étape :

- La gestion d'une requête retournant une promise (la pochette) dans un composant

Si on abstrait la fonction `albumArt`, il faudrait faire en sorte que la fonction englobante sorte en erreur dans certains cas pour aussi voir la gestion d'erreur asynchrone.

### Étape 4

Factoriser le composant de pochette pour pouvoir l'uiliser également dans le tableau (3è colonne).

Les props attendues : `artist`, `album` et `size`.

Points vus dans cette étape :

- La création d'un composant réutilisable

### Étape 5

À partir de maintenant, on va faire comme si les artistes venaient d'un serveur distant.

On va donc ajouter un champ textuel de recherche, qui lancera la recherche onChange.

Points vus dans cette étape :

- On revoit ce qu'on a vu pour le chargement de données asynchrone
- Le nombre d'état possible augmentant, on peut faire une première implem avec useState, et une seconde avec useReducer pour comparer les approches

POINTS BONUS sur cette étape (ou à mettre dans une étape ultérieure)

- utiliser du debounce pour la recherche, pour éviter que le résultat d'une requête partie avant n'arrive après (provoquant un résultat affiché "faux" car incohérent)
- charger les données au niveau du loader de la route, et montrer la simplification que ça entraîne au niveau du composant

## Étape 6

Création d'un nouvel artiste, l'idée est d'ajouter un bouton ouvrant un formulaire.

Par souci de simplicité, les albums seront à ajouter dans un textarea (un album / ligne) si en avance à voir pour faire un composant plus complexe.

Points vus dans cette étape :

- Gestion de formulaire avec React (dans cet exemple simple pas besoin de useState, on utilise le onSubmit pour récuperer les données saisies)
- Utilisation d'une fonction asynchrone, cette fois-ci pour envoyer des données et donner du feedback en cas d'erreur / succès

## Étape 7 réalisation d'un layout applicatif global

Avoir un menu simple, qui reste le même quel que soit la page.

Points vus dans cette étape :

- Prise en compte d'un layout global avec react router

C'est très teinté react-router, à voir si on veut vraiment faire ça ou faire un layout "à la mano".

## Étape 8 favoris

Autoriser la sauvegarde d'albums favoris.

Développer une page listant ces favoris, à ajouter en header au layout global.

Les favoris seront matérialisés par de petites étoiles sur les pochettes, ce sera l'occasion de parler du "props drilling" et de montrer une solution plus "simple" à base de contexte (les favoris ainsi que les méthodes pour en ajouter / retirer seraient dans le contexte).

Points vus dans cette étape :

- Le contexte
