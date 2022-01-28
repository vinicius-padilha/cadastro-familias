import { getAuth, signOut } from "firebase/auth";
import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import Logo from '../../assets/images/logo-white.png';
import { RoutesList } from "../../Routes";
import { useStore } from "../../store";

export function Layout() {
  const auth = getAuth();
  const { setUserData } = useStore();
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

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUserData({})
    }).catch((error) => {
      toast.error('Erro ao sair da aplicação')
    });
  }

  return (
    <div className="grid grid-cols-sidebar h-screen">
      <nav className="bg-space-cadet">
        <img className="my-12 mx-8" src={Logo} alt="Cadastro de Famílias" />
        <ul>
          {
            navigationList.map((item, index) => (
              <div key={item.name}>
                {index !== 0 && <span className="block bg-white w-11/12 h-px m-auto" />}
                <li className="text-white text-xl" key={item.name}>
                  <Link to={item.path} className="w-full block py-4 px-8">{item.name}</Link>
                </li>
              </div>
            ))
          }
          <div>
            <span className="block bg-white w-11/12 h-px m-auto" />
            <li className="text-white text-xl cursor-pointer">
              <span className="w-full block py-4 px-8" onClick={handleLogout}>sair</span>
            </li>
          </div>
        </ul>
      </nav>
      <div className="p-12 bg-cultured">
        <Outlet />
      </div>
    </div>
  )
}