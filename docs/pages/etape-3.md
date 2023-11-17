# Cycle de vie d'un composant 

- Mount : le montage. Il intervient quand une instance du composant est créé dans le DOM.
- Update : la mise à jour. Ce cycle de vie est déclenché par un changement d'état du composant.
- Unmount : le démontage. Cette méthode est appelée une fois qu'un composant est retiré du DOM.

# Interagir avec le monde extérieur

## Promesses

Une promesse est un objet (Promise) qui représente la complétion ou l'échec d'une opération asynchrone. 

```js
faireQqc()
  .then((result) => faireAutreChose(result))
  .then((newResult) => faireUnTroisiemeTruc(newResult))
  .then((finalResult) => {
    console.log("Résultat final : " + finalResult);
  })
  .catch(failureCallback);
```


## Avec React : useEffect

useEffect est un Hook React qui vous permet de synchroniser un composant React avec un système extérieur.

```js
useEffect(() => {
    alert(`J'affiche quelque chose à chaque rendu de mon composant et j'ai accès à ses ${variables}`)
});

useEffect(() => {
    alert(`J'affiche quelque chose au premier rendu de mon composant et j'ai accès à ses ${variables}`)
}, []);

useEffect(() => {
    alert(`J'affiche quelque chose à chaque rendu pour lequel ${variables} a changé`)
}, [variables]);

 useEffect(() => {
    alert(`J'affiche quelque chose à chaque rendu pour lequel ${variables} a changé`)
    return () => {
        alert('Je fais quelque chose au démontage de mon composant');
    }
}, [variables]);

useEffect(() => {
    appeldAPI().then(reponse => setState({
        ...state,
        reponse
    }));
}, [])
```

```jsx
const myComponent = ({id}) => {
    const [state, setState] = useState([]);
    useEffect(() => {
        fetch(`/api/${id}`).then(response => response.json()).then(jsonArray => {
            setState(jsonArray);
        });
    }, []);

    return <ul>
        {state?.map(val => <li key={val.id}>{val.name}</li>)}
    </ul>
}
```

# Les PropTypes

On peut utiliser des prop types pour spécifier les types de props attendues par un composant.
A l'exécution, si le type passé n'est pas bon, la navigateur affichera un avertissement dans la console.

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({type, values, name, obj, myFunction}) => {

    return <>
        <p>{type === 'int' && name}</p>
        {values.map(val => <p key={val}>{val}</p>)}
        <p>{obj?.property1}</p>
        <p>{obj?.property2}</p>
        <button onClick={myFunction}>Click me</button>
    </>
};

MyComponent.propTypes = {
    type: PropTypes.oneOf(['int', 'long', 'string']),
    values: PropTypes.arrayOf(PropTypes.number),
    name: PropTypes.string.isRequired,
    obj: PropTypes.shape({
        property1: PropTypes.string,
        property2: Proptypes.string
    }).isRequired,
    myFunction: PropTypes.func
};

MyComponent.defaultProps = {
    values: []
    myFunction: () => {}
};



```

# Etape 3

Enrichir le composant de vue des artistes avec l'image de la pochette (la fonction globale `albumArt` est à utiliser);
