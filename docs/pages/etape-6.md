# Ajout d'un artiste

L'idée est d'ajouter un bouton ouvrant un formulaire permettant de saisir :

- le nom d'un artiste
- une liste d'albums (un par ligne dans un textarea)

La fonction `add` du fichier `utils.js` est fournie.

## Bonus

- Implémenter un loader en attendant la confirmation de l'ajout. Un indicateur est fourni qui peut être affiché de la manière suivante : `<div className="loader"/>`
- Gérer les erreurs renvoyées par la fonction add (pour générer une erreur il suffit d'essayer d'ajouter un groupe déjà existant)
- Afficher un message de confirmation une fois l'ajout effectué correctement.
- Ajouter une logique de validation au formulaire (par exemple limiter la taille du nom d'artiste à 40 carcatères)
- Proposer un autre moyen de saisir plusieurs albums.
