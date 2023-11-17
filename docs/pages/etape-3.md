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
    alert("Je fais quelque chose au démontage de mon composant");
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

# Interagir avec le monde extérieur

## Promesses

Une promesse est un objet (Promise) qui représente la complétion ou l'échec d'une opération asynchrone. Les promesses sont notamment utilisées pour gérer les appels HTTP(s).

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
const myComponent = ({ id }) => {
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

Enrichir le composant de vue des artistes avec l'image de la pochette.

La fonction fetchCoverImage du fichiers utils/utils.js est à utiliser, elle s'appelle de la manière suivante :

```js
fetchCoverImage("nom de l'artiste", "nom de l'album", "medium"); // le 3è paramètre peut-être small, large ou medium en fonction de la taille souhaitée
```

## Bonus

Gérer les erreurs lors de la récupération des images (sur la page de "Led Zeppelin", un des albums provoque une erreur).
