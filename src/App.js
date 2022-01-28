import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { Layout } from "./components/Layout";
import { Title } from "./components/Title";
import { Listing } from "./pages/Listing";
import { Register } from "./pages/Register";
import { Welcome } from "./pages/Welcome";
import { RoutesList } from "./Routes";
import { useStore } from "./store";

function RequireAuth() {
  const { userData } = useStore();
  const isAuth = userData.accessToken;

  if (!isAuth) {
    return <Navigate to="/welcome" />;
  }

  return <Outlet />;
}

function AuthRoute() {
  const { userData } = useStore();
  const isAuth = userData.accessToken;

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path={RoutesList.WELCOME} element={<Welcome />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Listing />} />
            <Route path={RoutesList.REGISTER}>
              <Route index element={<Register />} />
              <Route path={`${RoutesList.EDIT_REGISTER}/:id`} element={<Title>editar <b>cadastro</b></Title>} />
              <Route path={`${RoutesList.VIEW_REGISTER}/:id`} element={<Title>visualizar <b>cadastro</b></Title>} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Title>Página não encontrada</Title>} />
      </Routes>
    </Router>
  );
}

export default App;
