# Sans React

## Le navigateur

Un navigateur web est un logiciel permettant de consulter et afficher le Web. Il dialogue à minima en HTTP.

Il utilise principalement 3 langages :

![htmlcssjs](../assets/img/html-css-js.jpg)

- `HTML` pour la structure des documents
- `CSS` pour la présentation des documents
- `Javascript` pour le dynamisme des documents


## HTML

Le HyperText Markup Language, généralement abrégé HTML ou, dans sa dernière version, HTML5, est le langage de balisage conçu pour représenter les pages web.


```html
<!DOCTYPE html>
<html>
    <head>
        <title>Ma page Web</title>
    </head>
    <body>
        <p>Un paragraphe</p>
        <p class="mes-paragraphes">Un autre paragraphe</p>
    </body>
</html>
```

## CSS

Les feuilles de style en cascade, généralement appelées CSS de l'anglais Cascading Style Sheets, forment un langage informatique qui décrit la présentation des documents HTML et XML.

```CSS
p {
    color: red;
}

.mes-paragraphes {
    color: blue;
}
```


## JavaScript

JavaScript est un langage de programmation de scripts principalement employé dans les pages web interactives et à ce titre est une partie essentielle des applications web.

```JavaScript

let str = 'Hello'
if (str.startsWith('H')) {
    alert(str);
}

```

## DOM

Le Document Object Model (DOM) est une interface de programmation normalisée par le W3C, qui permet à des scripts d'examiner et de modifier le contenu du navigateur web1.

```JavaScript
document.getElementById('un-id').innerText = 'Un autre texte';
document.getElementsByTagName('p')[0].className = 'mes-paragraphes'
```


# Etape 0

A l'aide du tableau `artistsWithAlbum` du fichier `utils.js`, créer une page qui crée un tableau comprenant tous les artistes, et pour chaque artiste la liste de ses albums.

## Bonus

Créer une fonction qui fait un tableau et qui prend en paramètres un tableau de données, et les colonnes du tableau.

- [destructuration de tableaux](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- parcours de tableaux