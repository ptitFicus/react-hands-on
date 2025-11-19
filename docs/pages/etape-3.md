# Cycle de vie d'un composant

- Mount : le montage. Il intervient quand une instance du composant est créé dans le DOM.
- Update : la mise à jour. Ce cycle de vie est déclenché par un changement d'état du composant.
- Unmount : le démontage. Cette méthode est appelée une fois qu'un composant est retiré du DOM.

## Avec React : useEffect

useEffect est un Hook React qui vous permet de synchroniser un composant React avec un système extérieur.

```js
useEffect(() => {
  alert(
    `J'affiche quelque chose à chaque rendu de mon composant et j'ai accès à ses ${variables}`
  );
});

useEffect(() => {
  alert(
    `J'affiche quelque chose au premier rendu de mon composant et j'ai accès à ses ${variables}`
  );
}, []);

useEffect(() => {
  alert(
    `J'affiche quelque chose à chaque rendu pour lequel ${variables} a changé`
  );
}, [variables]);

useEffect(() => {
  alert(
    `J'affiche quelque chose à chaque rendu pour lequel ${variables} a changé`
  );
  return () => {
    alert(
      "Je fais quelque chose au démontage de mon composant ou quand le useEffect se redéclenche"
    );
  };
}, [variables]);

useEffect(() => {
  appeldAPI().then((reponse) =>
    setState({
      ...state,
      reponse,
    })
  );
}, []);
```

### Limites de useEffect

Le hook useEffect est très puissant et permet de nombreuses choses, mais attention à ne pas en abuser. Avoir plusieurs useEffect modifiant chacun une partie du state d'un composant le rend très complexe à appréhender et débugger.

Cette page fourni un certain nombre d'exemple dans lesquel useEffect n'est pas la meilleure solution : https://react.dev/learn/you-might-not-need-an-effect.

Depuis React 18, les effets sont exécutés deux fois lorsque le composant se monte (si le StrictMode est activé), ce n'est pas un bug mais une feature permettant de détecter d'éventuels défaut dans l'implémentation de vos effets, plus de détails ici : https://react.dev/reference/react/useEffect#my-effect-runs-twice-when-the-component-mounts.

# Interagir avec le monde extérieur

## Promesses

petit rappel: Une [promesse](./javascript.md#promesses) est un objet (Promise) qui représente la complétion ou l'échec d'une opération asynchrone. Les promesses sont notamment utilisées pour gérer les appels HTTP(s).

```js
faireQqc()
  .then((result) => faireAutreChose(result))
  .then((newResult) => faireUnTroisiemeTruc(newResult))
  .then((finalResult) => {
    console.log("Résultat final : " + finalResult);
  })
  .catch((error) => console.error(error));
```

```jsx
const MyComponent = ({ id }) => {
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((jsonArray) => {
        setState(jsonArray);
      });
  }, []);

  return (
    <ul>
      {state?.map((val) => (
        <li key={val.id}>{val.name}</li>
      ))}
    </ul>
  );
};
```

# Objectif

Si vous n'avez pas eu le temps de finaliser l'étape précédente ou souhaitez repartir d'une base saine, positionnez vous sur la branche `etape-2bis`.

Enrichir le composant de vue des artistes avec l'image de la pochette à l'aide de la fonction fetchCoverImage du fichiers utils/utils.js. Elle retourne une promesse contenant l'url de l'image de la pochette et s'appelle de la manière suivante :

```js
fetchCoverImage("nom de l'artiste", "nom de l'album", "medium"); // le 3è paramètre peut-être small ou medium en fonction de la taille souhaitée
```

💡 Pour ne pas galérer en manipulant plusieurs promises en parallèle, il pourrait être judicieux de créer un composant dédié aux albums...

## Résultat attendu

![resultat-etape-3](../assets/img/resultat-etape-3.gif)

## Bonus

- Afficher un indicateur de chargement en attendant la réponse de `fetchCoverImage`. Un indicateur est fourni qui peut être affiché de la manière suivante : `<div className="loader"/>`
- Gérer les erreurs lors de la récupération des images (sur la page de "Led Zeppelin", un des albums provoque une erreur).
