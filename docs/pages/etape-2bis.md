# Router

## React-router

React router est une librairie permettant de gérer le routage côté client des applications React.

Elle permet de spécifier le composant à afficher pour une URL donnée, mais également de manipuler l'URL (en lecture ou écriture) et de faire des redirections entre les différentes pages de l'application sans devoir recharger toute l'application.

### Définition du router

```js
import {
  RouterProvider,
  createBrowserRouter,
  useParams,
  Link,
  Outlet,
} from "react-router-dom";

// Les routes sont définies dans un objet JavaScript
const router = createBrowserRouter([
  {
    // Route à laquel on souhaite afficher le composant
    path: "/garden",
    // Composant à afficher
    element: <GardenPage />,
  },
  {
    path: "/",
    element: <HomePage />,
    // Il est possible d'avoir des routes "enfant", si le composant parent rends un <Outlet/>
    children: [
      {
        path: "/room/:id", // La variable "id" sera accessible dans le composant avec useParams
        element: <Room />,
      },
    ],
  },
]);

function App() {
  // Ce composant doit être le plus proche possible de la racine de l'application
  return <RouterProvider router={router} />;
}

function HomePage() {
  return (
    <div>
      Bienvenue à la maison
      <br />
      <ul>
        <li>
          {/* les composants <Link/> permettent de rediriger vers d'autres routes */}
          {/* contrairement aux <a/>, ils ne provoquent pas un rechargement complet de la page */}
          <Link to="/room/chambre">Aller dans la chambre</Link>
        </li>
        <li>
          <Link to="/room/salon">Aller dans le salon</Link>
        </li>
        <li>
          <Link to="/garden">Aller dans le jardin</Link>
        </li>
      </ul>
      {/* Le composant <Outlet/> indique l'emplacement dans lequel les composants des routes enfant seront rendus (ici un éventuel composant <Room/>) */}
      <Outlet />
    </div>
  );
}

function GardenPage() {
  return (
    <div>
      Bienvenue dans le jardin
      <br />
      <Link to="/">Revenir dans la maison</Link>
    </div>
  );
}

function Room() {
  // Le hook useParams permet de récupérer les paramètres de l'URL, le nom récupéré doit être le même que celui déclaré dans l'URL, ici id
  const { id } = useParams();

  return <div>Bienvenue dans la pièce {id}</div>;
}
```
