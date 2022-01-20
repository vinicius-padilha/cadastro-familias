import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import Logo from '../../assets/images/logo-white.png';
import { RoutesList } from "../../Routes";

export function Layout() {
  const navigationList = [
    {
      name: "tela inicial",
      path: "/"
    },
    {
      name: "cadastro",
      path: `/${RoutesList.REGISTER}`
    }
  ]

  return (
    <div className="grid grid-cols-sidebar h-screen">
      <nav className="bg-space-cadet">
        <img className="my-12 mx-8" src={Logo} alt="Cadastro de Famílias" />
        <ul>
          {
            navigationList.map((item, index) => (
              <Fragment>
                {index !== 0 && <span className="block bg-white w-11/12 h-px m-auto" />}
                <li className="text-white text-xl my-4 mx-8" key={item.name}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              </Fragment>
            ))
          }
        </ul>
      </nav>
      <div className="p-12">
        <Outlet />
      </div>
    </div>
  )
}