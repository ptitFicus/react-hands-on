# La syntaxe JSX

JSX (JavaScript XML) est une extension syntaxique pour JavaScript qui permet aux développeurs d’écrire du code de type HTML à l’intérieur d’un fichier JavaScript. Elle a été développée par Meta.

```jsx
// Ceci n'est pas du HTML
const p = <p>Mon paragraphe</p>;
```

## Fonctionnement

Le code écrit en JSX est transformé en JavaScript avant d'être exécuté dans le navigateur. Cette transformation est effectuée à l’aide d’un outil appelé transpileur. Le transpileur le plus populaire pour JSX est Babel.

```jsx
//code JSX
const p = <p>Mon paragraphe</p>;

//code transpilée en Javascript
const p = React.createElement("p", null, "Mon paragraphe");
```

A noter que depuis React 17, ce n'est plus la fonction React.createElement qui est appelée lors de la transformation automatique du jsx.

```js
import { jsx as _jsx } from "react/jsx-runtime";

function App() {
  return _jsx("p", { children: "Mon paragraphe" });
}
```

## Dans un composant React

JSX rend les composants React beaucoup plus lisibles :

```jsx
import React from "react";

function MakeParagraph() {
  return React.createElement("p", {}, "Mon paragraphe");
}
```

```jsx
import React from "react";

function MakeParagraph() {
  return <p>Mon paragraphe</p>;
}
```

## Utiliser JSX

Il est possible d'utiliser des expressions JavaScript (variables, des conditions, boucles, ...) avec JSX.

```jsx
import React from "react";

const MyComponent = () => {
  const name = "John";
  const age = 30;

  const persons = [
    {
      id: 1,
      name: "John",
    },
    {
      id: 2,
      name: "Mike",
    },
    {
      id: 3,
      name: "Trevor",
    },
  ];

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
      <p>Next year, you will be {age + 1} years old.</p>
      {age >= 18 && <p>You are an adult.</p>}
      <ul>
        {persons.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
```

### CSS

Il est possible de passer des styles sous forme d'objet JavaScript.

```jsx
import React from "react";

const MyComponent = () => {
  const styles = {
    backgroundColor: "blue",
    color: "white",
    padding: "10px",
  };

  return (
    <div style={styles}>
      <h1>Hello, World!</h1>
      <p>This is a component with inline styles.</p>
    </div>
  );
};

export default MyComponent;
```

Les attributs peuvent être aussi des variables

```jsx
import React from "react";

const MyComponent = () => {
  return (
    <div className={["ma-classe", "autre-classe"].join(" ")}>
      <h1 className="autre-classe ma-classe-pour-titre">Hello, World!</h1>
    </div>
  );
};

export default MyComponent;
```

### Quelques règles

- Il ne faut renvoyer qu'un seul élément racine pour un composant
  React propose la notion de `Fragment` si le composant réalisé n'a pas à avoir d'élément racine.
  Respecter la [sémantique](https://fr.w3docs.com/apprendre-html/les-elements-semantiques-html5.html) du HTML reste primordial.

```jsx
<>
  <OneChild />
  <AnotherChild />
</>
```

Ce qui est équivalent à

```jsx
<React.Fragment>
  <OneChild />
  <AnotherChild />
</React.Fragment>
```

- Il faut utiliser `className` au lieu de `class`
- Le camelCase est utilisé : `onclick` en HTML devient `onClick` en JSX
- Il faut un attribut key unique pour chaque élément de boucle
