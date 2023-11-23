# Javactipt : les bases pour ce hand's on

Cette page n'a pas vocation à couvrir tout l'apprentissage de JavaScript, mais à vous donner les bases dont vous aurez besoin pour ce workshop.

## Fonctions

Il existe deux manière relativement équivalentes de déclarer des fonctions en JavaScript :

```js
function add(number1, number2) {
  return number1 + number2;
}

const substract = (number1, number2) => {
  return number1 - number2;
};

// La syntaxe à base de const a une version abbrégée si la fonction ne fait qu'une ligne

const multiply = (number1, number2) => number1 * number2; // pas besoin de return !
```

Dans ce hand's on, on peut utiliser les deux syntaxe de manière interchangeable.

La principale différence est que les fonction déclarées avec `function` peuvent être appelée avant leur déclaration, ce qui est impossible avec `const`.

```js
add(1, 2); // 3
function add(number1, number2) {
  return number1 + number2;
}

multiply(2, 3); // va jeter une erreur car multiply est définie plus bas dans le fichier
const multiply = (number1, number2) => number1 * number2;
```

## Variable

Il existe 3 manières de déclarer des variables en JavaScript, `const`, `let` et `var`. `var` est l'ancien mot clé et est généralement considéré comme déprécié.

`const` permet de déclarer une variable qu'il ne sera pas possible de réassigner, _il reste cependant possible de modifier le contenu de la variable_.

```js
const bar = [1, 2, 3];
bar = [4, 5, 6]; // lance une erreur, bar ne peut pas être réassigné à une autre valeur

bar.push(4); // bar contient maintenant [1,2,3,4]
```

## Manipulation de tableaux

### Déclaration d'un tableau

Les tableaux en JavaScript sont déclarés avec la syntaxe suivante

```js
const tableau1 = [1, 2, 3]; // tableau contenant 3 éléments
const tableau2 = []; // tableau vide
```

### map

La fonction `map` permet de transformer un tableau en un autre tableau, en appliquant sur chaque élément une fonction de transformation.

```js
const array = [1, 2, 3];

const result = array.map((value) => value + 1); // [2,3,4]
// le tableau contenu dans "array" n'a pas été modifié
```

### filter

La fonction `filter` permet de créer un nouveau tableau composé uniquement des éléments du tableau source satisfaisant un prédicat.

```js
const array = [1, 2, 3, 4];

const result = array.filter((value) => value > 2); // [3, 4]
```

## Structure conditionnelle

### if / else

### ternaires

## Opérateurs

### && et ||

### ?.

## Destructuring

## Promesses
