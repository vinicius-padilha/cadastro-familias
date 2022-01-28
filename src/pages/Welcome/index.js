import { Title } from "../../components/Title";
import Logo from "../../assets/images/logo.png"
import { Field } from "../../components/Field";
import { Button } from "../../components/Button";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "../../store";

export function Welcome() {
  const auth = getAuth();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [createUser, setCreateUser] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const { setLoading, setUserData } = useStore();

  const handleLogin = async (e) => {
    e.preventDefault()

    const emailInvalid = !login.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i) && !login.email.length;
    const passwordInvalidLen = login.password.length < 8;

    if (emailInvalid) return toast.error('Insira um email válido!')

    if (passwordInvalidLen) return toast.error('Sua senha deve ter no mínimo 8 caracteres!')

    try {
      setLoading(true)

      const userCredentials = await signInWithEmailAndPassword(auth, login.email, login.password);
      const { accessToken, displayName, email, uid } = userCredentials.user;


      setUserData({ accessToken, displayName, email, uid });
    } catch {
      toast.error("Erro ao realizar o login!");
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()

    const nameInvalid = !createUser.name.length;
    const emailInvalid = !createUser.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i) && !createUser.email.length;
    const passwordInvalidLen = createUser.password.length < 8;
    const passwordInvalid = createUser.password !== createUser.confirm_password && !createUser.password;

    if (nameInvalid) return toast.error('Insira um nome válido!')

    if (emailInvalid) return toast.error('Insira um email válido!')

    if (passwordInvalidLen) return toast.error('Sua senha deve ter no mínimo 8 caracteres!')

    if (passwordInvalid) return toast.error('As senhas não coincidem!')

    try {
      setLoading(true)

      await createUserWithEmailAndPassword(auth, createUser.email, createUser.password);

      await updateProfile(auth.currentUser, { displayName: createUser.name })

      toast.success("Conta criada com sucesso!");
    } catch {
      toast.error("Erro ao criar sua conta!");
    } finally {
      setLoading(false)
    }
  }

  const handleChangeLogin = ({ target }) => {
    setLogin({ ...login, [target.name]: target.value });
  }

  const handleChangeCreateUser = ({ target }) => {
    setCreateUser({ ...createUser, [target.name]: target.value });
  }

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <img src={Logo} alt="Logo" className="mb-16" />
      <div className="grid grid-cols-2 gap-80">
        <form onSubmit={handleLogin}>
          <div className="flex flex-col w-72 gap-y-4 relative after:w-px after:h-72 after:absolute after:bg-light-silver after:-right-40">
            <Title>realizar login</Title>
            <Field placeholder="email" name="email" value={login.email} onChange={handleChangeLogin} />
            <Field type="password" placeholder="senha" name="password" value={login.password} onChange={handleChangeLogin} />

            <Button className="mt-4">entrar</Button>
          </div>
        </form>
        <form onSubmit={handleCreateUser}>
          <div className="flex flex-col w-72 gap-y-4">
            <Title>crie a sua conta</Title>
            <Field placeholder="nome" name="name" value={createUser.name} onChange={handleChangeCreateUser} />
            <Field placeholder="email" name="email" value={createUser.email} onChange={handleChangeCreateUser} />
            <Field type="password" placeholder="senha" name="password" value={createUser.password} onChange={handleChangeCreateUser} />
            <Field type="password" placeholder="confirmar senha" name="confirm_password" value={createUser.confirm_password} onChange={handleChangeCreateUser} />

            <Button type="submit" className="mt-4">cadastrar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}