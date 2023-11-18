# Recherche asynchrone

On cherche à charger les artistes comme s'ils venaient d'un serveur distant.
La fonction `search` du fichier `utils.js` réalise la recherche.

Il faut ajouter un champ texte, qui va à chaque changement interroger la liste des artistes et permettre l'affichage du tableau.

Rien de très nouveau dans cette étape, il s'agit de réutiliser tout ce que vous avez apris dans les étapes précédentes ;)

Une implémentation "simple" est réalisable avec useState/useEffect.

## Bonus

- implémenter un loader en attendant le chargement des résultats. Un indicateur est fourni qui peut être affiché de la manière suivante : `<div className="loader"/>`
- utiliser du debounce pour la recherche, pour éviter que le résultat d'une requête partie avant n'arrive après (provoquant un résultat affiché "faux" car incohérent)
- utiliser le hook useReducer à la place de useState / useEffect pour gérer la logique d'état du composant
- utiliser les [loader](https://reactrouter.com/en/main/route/loader) de react-router pour charger les données à l'entrée sur la route, et donc éviter de gérer cette logique dans le composant, l'idée ici est de positionner la recherche courante dans le "search" de l'URL (par exemple `http://localhost:3000?search=aerosmith`). Pour positionner / lire ces paramètre, on peut utiliser le hook [useSearchParams](https://reactrouter.com/en/main/hooks/use-search-params) fourni par react-router.
