# Ajout d'un artiste

Si vous n'avez pas eu le temps de finaliser l'étape précédente ou souhaitez repartie d'une base saine, positionnez vous sur la branche `etape-5`.

L'idée est d'ajouter un bouton ouvrant un formulaire permettant de saisir :

- le nom d'un artiste
- une liste d'albums (un par ligne dans un textarea)

La fonction `add` du fichier `utils.js` est fournie.

Le service de récupération des images de pochette est bouchonné (pour des raisons de quota de requête et de compatibilité avec le réseau interne), il n'y a donc que quelques groupes qui fonctionnent en ajout (vous n'êtes pas obligé d'ajouter tous les albums) :

- The Beatles
  - Let It Be
  - Abbey Road
  - Yellow Submarine
  - The Beatles (l'« Album blanc »)
  - Sgt. Pepper's Lonely Hearts Club Band
  - Revolver
  - Rubber Soul
  - Help!
  - Beatles for Sale
  - A Hard Day's Night
  - With the Beatles
  - Please Please Me
- The Cure
  - 4:13 Dream
  - The Cure
  - Bloodflowers
  - Wild Mood Swings
  - Wish
  - Disintegration
  - Kiss Me, Kiss Me, Kiss Me
  - The Head on the Door
  - The Top
  - Pornography
  - Faith
  - Seventeen Seconds
  - Three Imaginary Boys
- Louise Attaque
  - Anomalie
  - Avec le temps
  - Depuis toujours
  - Du grand banditisme
  - Du monde tout autour
  - Du nord au sud
  - J't'emmène au vent
  - L'intranquillité
  - La Frousse
  - La brune
  - Les nuits parisiennes
  - Léa
  - Pour un oui, pour un non
  - Si c'était hier
  - Si l'on marchait jusqu'à demain
  - Sortir de l'ordinaire
  - Ton invitation
  - Tu dis rien

## Bonus

- Implémenter un loader en attendant la confirmation de l'ajout. Un indicateur est fourni qui peut être affiché de la manière suivante : `<div className="loader"/>`
- Gérer les erreurs renvoyées par la fonction add (pour générer une erreur il suffit d'essayer d'ajouter un groupe déjà existant)
- Afficher un message de confirmation une fois l'ajout effectué correctement.
- Ajouter une logique de validation au formulaire (par exemple limiter la taille du nom d'artiste à 40 carcatères)
- Proposer un autre moyen de saisir plusieurs albums.
