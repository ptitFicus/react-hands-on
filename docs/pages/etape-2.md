# State et props

## Props

Les composants React utilisent des props pour communiquer entre eux. Chaque composant parent peut passer des informations à ses composants enfants en leur donnant des props. Les props vous rappellent peut-être les attributs HTML, mais vous pouvez y passer n’importe quelle valeur JavaScript, y compris des objets et des fonctions.

```jsx
function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
      <Avatar
        size={80}
        person={{
          name: "Aklilu Lemma",
          imageId: "OKS67lh",
        }}
      />
      <Avatar
        size={50}
        person={{
          name: "Lin Lanying",
          imageId: "1bX5QH6",
        }}
      />
    </div>
  );
}
```

Les props permettent également une forme de communication enfant -> parent grâce au passage de fonction de callback.

```jsx
function MySuperForm({ submit }) {
  return (
    <form
      onSubmit={(e) => {
        // évite de rafraîchir la page au submit
        e.preventDefault();
        // Call parent function with form values
        submit(e.target.user.value);
      }}
    >
      <label>
        Name
        <input type="text" name="user" />
      </label>
      <button type="submit">Valider</button>
    </form>
  );
}

function ParentComponent() {
  return <MySuperForm submit={(username) => console.log(username)} />;
}
```

## useState

useState est un Hook React qui ajoute une variable d’état dans votre composant.

```js
const [state, setState] = useState(initialState);
```

```jsx
export default function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fullName = firstName + " " + lastName;

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <h2>Enregistrez-vous :</h2>
      <label>
        Prénom : <input value={firstName} onChange={handleFirstNameChange} />
      </label>
      <label>
        Nom : <input value={lastName} onChange={handleLastNameChange} />
      </label>
      <p>
        Votre billet sera au nom de : <b>{fullName}</b>
      </p>
    </>
  );
}
```

# Etape 2

Ajouter une troisième colonne au tableau. Elle comprend un bouton `Display` permettant d'afficher le détail d'un artiste : son nom et la liste de ses albums.
Lorsqu'un artiste est affiché, le bouton dans le tableau devient `Hide`

## Bonus

Créer un champ texte permettant de filtrer la liste des artistes.
