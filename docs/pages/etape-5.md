# Recherche asynchrone

On cherche à charger les artistes comme s'ils venaient d'un serveur distant.
La fonction `search` du fichier `utils.js` réalise la recherche.

Il faut ajouter un champ texte, qui va à chaque changement interroger la liste des artistes et permettre l'affichage du tableau.

react-router propose des fonctions intéressantes pour gérer la recherche avec une url.

## Bonus

- utiliser du debounce pour la recherche, pour éviter que le résultat d'une requête partie avant n'arrive après (provoquant un résultat affiché "faux" car incohérent)