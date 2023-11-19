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


# Etape 4

Factoriser le composant de pochette pour pouvoir l'uiliser également dans le tableau (3ème colonne).

Les props attendues : `artist`, `album` et `size`.