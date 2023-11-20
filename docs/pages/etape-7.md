# Sauvegarde locale des favoris

## Le contexte

Le contexte est un moyen de rendre disponible des données de manière globale.
Il est très utile :

- Lorsqu'une donnée a besoin d'être accédée par de nombreux composants de l'application
- Lorsqu'une donnée a besoin d'être accédée par des composants située "profondément" dans l'arbre des composants, mais qu'elle n'intéresse pas les composants intermédiaires

Par exemple :

```jsx
function Layout({ user, todos }) {
  return (
    <>
      <div>Connected as {user.name}</div>
      <Todos user={user} todos={todos} />
    </>
  );
}

// dans ce composant user ne sert qu'à être passé au composant enfant
function Todos({ user, todos }) {
  return;
  <>
    <h1>Tasks</h1>
    {todos.map((todo) => (
      <Todo key={todo.id} todo={todo} user={user} />
    ))}
  </>;
}

// dans ce composant user ne sert qu'à être passé au composant enfant
function Todo({ todo, user }) {
  return (
    <>
      <div>{todo.name}</div>
      <Options user={user} />
    </>
  );
}

function Options({ user }) {
  return (
    <>
      <button>Edit</button>
      {user.isAdmin && <button>Delete</button>}
    </>
  );
}
```

Dans l'exemple ci-dessus, les composants Todos et Todo doivent passer l'objet `user` sans s'en servir eux-même. Lorsque cette situation se produit sur une grande profondeur, on parle de "props drilling". Le context est un moyen de régler ce souci en rendant certaines données accessible depuis n'importe où dans la hiérarchie de composant.

```jsx
import { createContext, useContext } from "react";

// à la création du contexte, on donne une valeur par défaut qui ne sera utilisé que si un composant
// tente d'accéder à la valeur de contexte sans avoir un Provider parmis ses parents.
const UserContext = createContext({});

function Layout({ user, todos }) {
  return (
    <>
      <div>Connected as {user.name}</div>
      {/* On spécifie ici la valeur que va avoir le context pour les composant enfant l'utilisant */}
      <UserContext.Provider value={{ name: "Thomas", isAdmin: true }}>
        <Todos todos={todos} />
      </UserContext.Provider>
    </>
  );
}

function Todos({ todos }) {
  return;
  <>
    <h1>Tasks</h1>
    {todos.map((todo) => (
      <Todo key={todo.id} todo={todo} />
    ))}
  </>;
}

function Todo({ todo }) {
  return (
    <>
      <div>{todo.name}</div>
      <Options />
    </>
  );
}

function Options() {
  // Le hook useContext permet d'accéder à la value du Provider parent le plus proche
  const { isAdmin } = useContext(UserContext);
  return (
    <>
      <button>Edit</button>
      {isAdmin && <button>Delete</button>}
    </>
  );
}
```

Comme on peut le voir, l'utilisation du context a simplifié les "composants intermédiaires" Todo et Todos, ce qui simplifie leur compréhension / maintenance et favorise leur réutilisabilité.

Attention toutefois à ne pas placer dans un seul contexte toutes les valeurs "transverses" d'une application (par exemple le thème de couleur, l'utilisateur connecté, des préférences utilisateur, ...) car le changement d'une partie de la valeur d'un contexte (par exemple l'utilisateur connecté) provoque le re-rendu de l'ensemble des composants s'appuyant sur le contexte (même si c'était uniquement pour le thème de couleur).

La bonne pratique est donc de créer un contexte par entité sémantique, afin d'éviter les re-rendus inutiles.

Il est également possible d'exposer dans le contexte des fonctions permettant de le modifier :

```jsx
const TodoContext = createContext([]);

function App() {
  // On souhaite exposer le state local de App dans le contexte
  const [todos, setTodos] = useState([]);
  const addTodo = (name, id) =>
    // On utilise une syntaxe alternative du setter qui permet d'avoir en entrée la valeur actuelle de l'état pour le modifier
    setTodos((currentState) => {
      // ATTENTION à bien destructurer le tableau pour renvoyer une nouvelle référence, sinon rien ne sera re-rendu.
      // Par exemple currentState.push({ name, id }) ne fonctionnerai pas correctement
      return [...currentState, { name, id }];
    });
  const removeTodo = (idToRemove) =>
    setTodos((currentState) =>
      currentState.filter(({ id }) => idToRemove !== id)
    );

  // Les fonctions addTodo et removeTodo devraient probablement être wrappée dans un useCallback, mais c'est une autre histoire ;) (https://react.dev/reference/react/useCallback)

  return (
    <>
      <TodoContext.Provider value={(todos, addTodo, removeTodo)}>
        <Todos />
      </TodoContext.Provider>
    </>
  );
}
```

# Objectif

Si vous n'avez pas eu le temps de finaliser l'étape précédente ou souhaitez repartir d'une base saine, positionnez vous sur la branche `etape-6`.

Autoriser l'utilisateur à sauvegarder ses albums favoris.

Le fait qu'un album soit parmis les favoris est matérialisé par une petite étoile colorée sur la couverture de l'album, l'étoile est vide si l'album n'est pas favoris.

Le CSS pour les étoiles est déjà disponible, il suffit donc d'utiliser les classes CSS `star` et `active` de la manière suivante :

```jsx
{
  /* La classe star positionne une étoile sur l'image, la classe active la colore */
}
<div className={`star ${isFavorite ? "active" : ""}`}>
  <img src={url} />
</div>;
```

Le stockage des favoris est à faire dans le localStorage, de manière à ce que l'utilisateur retrouve ses favoris d'une visite à l'autre.

Le localStorage est un stockage embarqué dans le navigateur associé au domaine de l'application, c'est un bon moyen de stocker par exemple des préférences utilisateurs.

Pour lire une valeur du localStorage :

```jsx
// la valeur retournée est soit la chaîne de charactère stockée à cette entrée, soit null si l'entrée n'existe pas
const valueAsString = localStorage.getItem("favorites");
```

Pour écrire dans le localStorage :

```jsx
// il est nécessaire de convertir les valeurs en chaîne de charactère pour les stocker
localStorage.setItem("favorites", JSON.stringify(["favorite1", "favorite2"]));
```

Le seul composant intéressé par les favoris est pour l'instant le composant destiné à afficher les couvertures des albums.

Afin d'éviter de passer le tableau des favoris dans tous les composants, il faudra le stocker dans un contexte, ainsi que des fonctions permettant d'ajouter / retirer des favoris.

## Bonus

Créer une page permettant de visualiser l'ensemble des albums favoris de l'utilisateur.
