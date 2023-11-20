# React

React (aussi appelé React.js ou ReactJS) est une bibliothèque JavaScript libre développée par Facebook (maintenant Meta) depuis 2013. Le but principal de cette bibliothèque est de faciliter la création d'application web monopage, via la création de composants dépendant d'un état et générant une page (ou portion) HTML à chaque changement d'état.

## Virtual DOM

Pour des questions d'optimisation de performances, React maintient un DOM virtuel, qu'il modifie avant de transmettre les modifications au DOM du navigateur.

## JSX

JSX (JavaScript Syntax Extension et parfois appelé JavaScript XML) est une extension React de la syntaxe du langage JavaScript qui permet de structurer le rendu des composants à l'aide d'une syntaxe familière à de nombreux développeurs. Il est similaire en apparence au HTML.

```jsx
const App = () => {
  return (
    <div>
      <p>En-tête</p>
      <p>Contenu</p>
      <p>Pied de page</p>
    </div>
  );
};
```

## Variabiliser des éléments de contenu

Pour insérer le contenu d'une variable JS dans un bloc de JSX, il faut utiliser la syntaxe `{maVariable}`.

```jsx
const App = () => {
  const value = "Some value";
  return (
    <div>
      <p>En-tête</p>
      <p>{value}</p>
      <p>Pied de page</p>
    </div>
  );
};
```

## Affichage conditionnel et parcours de tableau

Comme JSX n'est qu'une extension du langage JavaScript, de nombreuses mécaniques de JavaScript sont utilisables directement dans le JSX.

Par exemple il est possible d'utiliser l'opérateur ternaire pour faire de l'affichage conditionnel : `{user === "Admin" ? "Welcome admin !!!" : "Welcome"}`.

Il est également possible d'utiliser l'opérateur `&&` pour n'afficher quelque chose que si une variable / expression est ["truthy"](https://developer.mozilla.org/fr/docs/Glossary/Truthy) : `{user === "Admin" && "Current user is admin"}`.

Au sein de ces expressions, il est possible de rendre non seulement des chaîne de caractère mais aussi des éléments JSX : `{user === "Admin" && <button>Delete application</button>}`.

On peut également utiliser les méthodes JS habituelles de parcours des tableaux (map, filter, reduce). L'utilisation de map permet par exemple d'afficher un élément JSX pour chaque élément du tableau.
Lorsque l'on fait des itérations de ce genre, il est nécessaire pour chaque élément rendu de lui attribuer une propriété ["key"](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key) qui doit être unique au sein du composant.

Pour plus de détails sur le JSX et sa syntaxe, visitez les pages suivantes :

- https://react.dev/learn/writing-markup-with-jsx
- https://react.dev/learn/javascript-in-jsx-with-curly-braces
- https://react.dev/learn/conditional-rendering
- https://react.dev/learn/rendering-lists

```jsx
const App = () => {
  const chose = true;
  const value = "Some value";
  const otherValue = "Other value";
  const values = [1, 2, 3, 4, 5, 5];

  return (
    <div>
      <p>En-tête</p>
      <p>{value}</p>
      <p>{chose ? value : otherValue}</p>
      {chose && (
        <>
          <p>{value}</p>
          <p>{otherValue}</p>
        </>
      )}
      <ul>
        {values.map((val) => (
          <li key={val}>{`La chaine numéro ${val}`}</li>
        ))}
      </ul>
    </div>
  );
};
```

## Rendre plusieurs éléments dans un composant

Il est parfois nécessaire de rendre deux composants côte à côté (que ce soit dans un composant ou lors du parcours d'un tableau).

React ne supporte cependant pas le rendu de plusieurs éléments "racines" dans un composant :

```jsx
function MonSuperComponent() {
  // Ce code génère une erreur
  return <div>Hello</div><div>World !</div>
}
```

Il est bien sûr possible de "wrapper" les éléments dans un seul parent (par exemple une div), mais cela alourdi inutilement le DOM et peut poser problème au niveau des règles de style CSS.

La méthode préconisée est donc d'utiliser les "Fragments" (https://react.dev/reference/react/Fragment), ce sont des éléments de syntaxe JSX qui disparaissent lors de la conversion du JSX en HTML.

```jsx
function MonSuperComponent() {
  return (
    // Version courte de la syntaxe
    <>
      <div>Hello</div>
      <div>World !</div>
    </>
  );
}

function MonAutreSuperComponent() {
  return (
    // Version longue de la syntaxe
    <React.Fragment>
      <div>Hello</div>
      <div>World !</div>
    </React.Fragment>
  );
}
```

# Objectif

Positionnez vous sur la branche `etape-1-debut`, puis réaliser le même tableau que précédemment à l'aide de React (cette fois-ci dans le fichier App.jsx).

## Bonus

Rendre le tableau indépendant de la fonction `artistsWithAlbums`.
