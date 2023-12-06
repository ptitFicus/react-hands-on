# Javascript : les bases pour ce hand's on

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

const multiply = (number1, number2) => number1 * number2; // pas besoin d'accolades ni de return !
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

## Chaînes de caractères

Il existe 3 manières de déclarer des chaînes de caractère en JavaScript.

Les syntaxes avec `""` et `''` sont équivalentes :

```js
const chaine1 = "foo";
const chaine2 = "bar";
```

On peut concaténer des chaînes de caratère entre elles avec `+`.

Pour insérer des variables dans des chaînes de caractère, on peut également utiliser la synatxe ` `` `

```js
const chaine1 = "foo";
const chaine2 = 3;

console.log(`Chaine1 vaut ${chaine1} et chaine2 vaut ${chaine2}`);
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

### Destructuring assignment

Il est possible d'extraire certaines valeurs d'un tableau dans des variables quand on le manipule :

```js
const tab = [1, 2, 3, 4];

const [first, second] = tab;

console.log(first); // 1
console.log(second); // 2
```

### Spread operator

Le spread operator `...` permet "d'éclater" tout ou partie d'un tableau dans un nouveau tableau.

Il est utile soit pour extraire la fin d'un tableau dans un nouveau tableau en faisant du destructuring, soit pour ajouter un ou n éléments à un tableau en créant un nouveau tableau.

```js
const tab = [1, 2, 3, 4];

const [first, second, ...rest] = tab;

console.log(rest); // [3, 4]

const enrichedTab = [...tab, 5, 6];
console.log(enrichedTab); // [1, 2, 3, 4, 5, 6]
```

## Objets

En JavaScript, un objet se déclare de la manière suivante :

```js
const obj = { a: 1, b: "foo" }; // objet avec une clé "a" valant 1 et une clé "b" valant "foo"
const objetVide = {};
```

On peut accéder aux valeurs contenues dans les objets de deux manières différentes :

```js
const obj = { a: 1, b: "foo" };

console.log(obj.a); // 1

const key = "b"; // On ne connaît parfois pas la clé à laquelle on veut accéder car son nom est contenu dans une variable
console.log(obj[key]); // "foo"
```

Il est également possible d'avoir des objets plus complexes, contenant des sous-objets, des tableaux, ...

```js
const objetComplique = {
  sousObjet: {
    a: 1,
    b: "foo",
  },
  autreSousObjet: {
    tableau: [1, 2, 3],
  },
};
```

### Destructuring assignment

Commme pour les tableaux, il est possible d'extraire certaines ou toutes les valeurs d'un objet dans des variables lorsqu'on le manipule :

```js
const obj = { a: 1, b: "foo" };

const { a, b } = obj;

console.log(a); // 1
console.log(b); // "foo"

// Cette fonction attends en paramètre un objet contenant au moins les clés a et b
function fifou({ a, b }) {
  console.log(a);
  console.log(b);
}
```

### Spread operator

L'opérateur `...` vu pour les tableaux peut également être utilisé sur les objets

```js
const obj = { a: 1, b: "foo", c: 3, d: "b" };

const { a, b, ...rest } = obj;

console.log(rest); // {c: 3, d: "b"}

const enrichedObj = { ...obj, e: 5 };
console.log(enrichedObj); // { a: 1, b: "foo", c: 3, d: "b", e: 5 }

// On peut également s'en servir pour écraser des valeur existantes

const overridedObj = { ...obj, b: 2, d: 4 };
console.log(overridedObj); // {a: 1, b: 2, c: 3, d: 4}
```

## Structure conditionnelle

### if / else

La structure if/ else est assez classique et similaire à celle de nombreux autres langages :

```js
const value = 1;
if (value === 1) {
  console.log("value vaut 1");
} else if (value === 2) {
  console.log("value vaut 2");
} else {
  console.log("value ne vaut ni 1 ni 2");
}
```

### ternaires

Une autre manière de construire une structure conditionnelle est via l'utilisation de "ternaire".

Cette expression fonctionne comme un if / else à ceci près qu'elle peut renvoyer une valeur.

```js
const value = 1;

value === 1 ? console.log("Value vaut 1") : console.log("Value ne vaut pas 1");

const zeroOrTwo = value === 1 ? 0 : 2;
```

## Opérateurs

### == vs ===

En JavaScript il existe deux opérateurs permettant de vérifier l'égalité de deux variables : `==` et `===`.

L'opérateur `==` est historique et son utilisation est généralement considérée comme une mauvaise pratique, il vaut donc mieux toujours utiliser `===`.

De même, l'opérateur de différence `!==` est à privilégier sur sa version historique `!=`.

### && et ||

L'opérateur `&&` est un "ET" logique, il vérifie que toutes ses conditions sont évaluée à `true`.

```js
const value1 = 1;
const value2 = 2;

if (value1 === 1 && value2 === 2) {
  console.log("Value1 vaut 1 et value2 vaut 2");
} else {
  console.log("Raté");
}
```

Lorsque toute les valeurs sont évaluée à `true`, cet opérateur ne renvoie pas true mais la dernière valeur, c'est une subtilité importante, qui sert beaucoup lorsque l'on fait du React/JSX.

```js
const value1 = 1;
const value2 = 2;

console.log(value1 && value2); // affiche 2 et pas true
```

L'opérateur `||` est quand à lui le "OU" logique, il véfifie qu'au moins une des conditions soit évaluée à `true`.

```js
const value1 = 1;
const value2 = 3;

if (value1 === 1 || value2 === 2) {
  console.log("Value1 vaut 1 ou value2 vaut 2");
} else {
  console.log("Raté");
}
```

### Valeurs truthy et falsy

En JavaScript, toutes les valeurs peuvent être converties en booléen nativement.

C'est ce qui permet par exemple d'écrire du code comme le suivant :

```js
const value = 1;

if (value) {
  // ça fonctionne alors que value est un nombre et pas un booléen
  console.log("Value a été converti en true");
} else {
  console.log("Value a été converti en false");
}
```

La règle de conversion est assez simple :

> Toutes les valeurs sont converties en `true` sauf `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined` et `NaN`, qui sont elles converties en `false`

Les valeurs convertissables en `true` de cette manière sont appelée `truthy`, les autres `falsy`.

Toutes les fonctions/operateurs acceptant des booléens vus jusqu'ici acceptent en réalité n'importe quelle valeur et feront automatiquement la conversion : `filter`, `&&`, `||`, `if/else`, les ternaires, ...

### ?.

L'opérateur `?.`, aussi appelé "optional chaining opertor" permet d'accéder à des entrées d'objets ou de tableaux qui sont peut être `undefined` (non définies). Il permet de parcourir un objet en profondeur sans lancer d'erreur si on passe par des noeuds qui n'existe pas. Il renvoie la valeur cherchée si elle existe, sinon undefined.

C'est très utile lorsqu'on manipule un objet dont on est pas certain qu'il ait tous les attributs qui nous intéressent.

```js
const obj = {
  sousObj: {
    b: 1,
  },
};

console.log(obj?.sousObj?.b); // 1

console.log(obj.unAutreObjet.d.c); // lance une erreur
console.log(obj?.unAutreObjet?.d?.c); // undefined
```

### Autres opérateurs

Il existe de nombreux autres opérateurs en JavaScript, qui seront moins utiles dans le cadre de ce workshop.

Si vous rencontrez l'un d'eux et voulez connaître sa signification, [ce site est très utile](https://www.joshwcomeau.com/operator-lookup/)

## Promesses

L'objet `Promise` (pour « promesse ») est utilisé pour réaliser des traitements de façon asynchrone. Une promesse représente une valeur qui peut être disponible maintenant, dans le futur voire jamais.

```js
const maPromesse = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("toto"); //la promesse resolue renvoie la chaine de charactère 'toto'
  }, 300);
});
```

L'interface `Promise` représente un intermédiaire vers une valeur qui n'est pas nécessairement connue au moment de la création de la promesse. Tant qu'elle n'est pas consommée, elle peut se trouver dans 3 états :
- *pending*,  c'est l'etat initial, l'operation est *en attente*.
- *fullfilled*, la promesse est *tenue*, l'opération est réussie
- *rejected*, la promesse est *rompue*, l'opération à échouée

Pour consommer une promesse, l'interface vous met a disposition les methodes `then` et `catch`, la première dans le cas ou la promesse est tenue, la seconde si elle a échouée.

```js
const maPromesse = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("toto"); 
  }, 300);
});

maPromesse
  .then(response => console.log(response)) //log de 'toto'

```

Ces 2 méthodes renvoient des promesses, ce qui vous permettra de chainer des promesses.

```js
const maPromesse = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("toto"); 
  }, 300);
});

maPromesse
  .then(response => response.toUpperCase())
  .then(response => console.log(response)) //log de 'TOTO'
  .catch(error => console.error(error)) //log de l'erreur si echec de la promesse
```