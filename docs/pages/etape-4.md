# Réutiliser des composants

Avec les props, on peut "paramétrer" un composant pour qu'il change son comportement ou son rendu en fonction des situations.

```jsx
<StringFormFragment
    id="search"
    label="Rechercher"
    showLabel={false}
    unit={<Recherche className="plm-search-form-fragment-icon" />}
    value={state.search}
    onValueChange={search => setState({ ...state, search })}
  />

<StringFormFragment
    id="firstName"
    label="Prénom"
    value={state.firstName}
    error="Un prénom n'est jamais valide pour l'exemple"
    hint="Hint non affiché car il y a une erreur"
    onValueChange={firstName => setState({ ...state, firstName })}
  />
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

# Etape 4

Factoriser le composant de pochette pour pouvoir l'uiliser également dans le tableau (3ème colonne).

Les props attendues : `artist`, `album` et `size`.

Définissez également les propTypes pour ce composant.
