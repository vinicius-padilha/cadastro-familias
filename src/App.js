import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Layout } from "./components/Layout";
import { Title } from "./components/Title";
import { RoutesList } from "./Routes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={RoutesList.START} element={<Title>start Page</Title>} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Title>listagem</Title>} />
          <Route path={RoutesList.REGISTER}>
            <Route index element={<Title>cadastro</Title>} />
            <Route path={`${RoutesList.EDIT_REGISTER}/:id`} element={<Title>editar <b>cadastro</b></Title>} />
            <Route path={`${RoutesList.VIEW_REGISTER}/:id`} element={<Title>visualizar <b>cadastro</b></Title>} />
          </Route>
        </Route>
        <Route path="*" element={<Title>Página não encontrada</Title>} />
      </Routes>
    </Router>
  );
}

export default App;
