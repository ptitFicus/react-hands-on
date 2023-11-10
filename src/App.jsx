import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Search } from "./pages/Search";
import { Artist } from "./pages/Artist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
  },
  { path: "/artist/:artistId", element: <Artist /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
