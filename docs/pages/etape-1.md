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
}
```

```jsx
const App = () => {
  const value = 'Some value';
  return (
   <div>
    <p>En-tête</p>
    <p>{value}</p>
    <p>Pied de page</p>
   </div>
  ); 
}
```

```jsx
const App = () => {
  const chose = true;
  const value = 'Some value';
  const otherValue = 'Other value';
  const values = [1, 2, 3, 4, 5, 5];

  return (
   <div>
    <p>En-tête</p>
    <p>{value}</p>
    <p>{chose ? value : otherValue}</p>
    {chose && <>
      <p>{value}</p>
      <p>{otherValue}</p>
    </>}
    <ul>
    {values.map(val => 
      <li key={val}>
        {`La chaine numéro ${val}`}
      </li>
    )}
    </ul>
   </div>
  ); 
}
```

# Etape 1

Réaliser le même tableau que précédemment à l'aide de React.

## Bonus

Rendre le tableau indépendant de la constante `artistsWithAlbums`.