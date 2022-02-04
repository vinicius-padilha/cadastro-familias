import { Title } from "../../components/Title";
import Logo from "../../assets/images/logo.png"
import { Field } from "../../components/Field";
import { Button } from "../../components/Button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useStore } from "../../store";
import { FormProvider, useForm } from "react-hook-form";
import { CreateAccount } from "./components/CreateAccount";

export function Welcome() {
  const methods = useForm();
  const auth = getAuth();

  const { setLoading, setUserData } = useStore();

  const handleLogin = async (data) => {
    console.log(data)
    const emailInvalid = !data.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i) && !data.email.length;
    const passwordInvalidLen = data.password.length < 8;

    if (emailInvalid) return toast.error('Insira um email válido!')

    if (passwordInvalidLen) return toast.error('Sua senha deve ter no mínimo 8 caracteres!')

    try {
      setLoading(true)

      const userCredentials = await signInWithEmailAndPassword(auth, data.email, data.password);
      const { accessToken, displayName, email, uid } = userCredentials.user;

      setUserData({ accessToken, displayName, email, uid });
    } catch {
      toast.error("Erro ao realizar o login!");
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <img src={Logo} alt="Logo" className="mb-16" />
      <div className="grid grid-cols-2 gap-80">
        <FormProvider {...methods} >
          <form onSubmit={methods.handleSubmit(handleLogin)}>
            <div className="flex flex-col w-72 gap-y-4 relative after:w-px after:h-72 after:absolute after:bg-light-silver after:-right-40">
              <Title>realizar login</Title>
              <Field placeholder="email" name="email" />
              <Field type="password" placeholder="senha" name="password" />

              <Button type="submit" className="mt-4">entrar</Button>
            </div>
          </form>
        </FormProvider>
        
        <CreateAccount />
      </div>
    </div>
  )
}

