import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../../components/Button";
import { Field } from "../../../../components/Field";
import { Title } from "../../../../components/Title";
import { useStore } from "../../../../store";

export function CreateAccount() {
  const methods = useForm();
  const { setLoading } = useStore();
  const auth = getAuth();

  const handleCreateUser = async (data) => {
    console.log(data)
    const nameInvalid = !data.name.length;
    const emailInvalid = !data.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i) && !data.email.length;
    const passwordInvalidLen = data.password.length < 8;
    const passwordInvalid = data.password !== data.confirm_password && !data.password;

    if (nameInvalid) return toast.error('Insira um nome válido!')

    if (emailInvalid) return toast.error('Insira um email válido!')

    if (passwordInvalidLen) return toast.error('Sua senha deve ter no mínimo 8 caracteres!')

    if (passwordInvalid) return toast.error('As senhas não coincidem!')

    try {
      setLoading(true)

      await createUserWithEmailAndPassword(auth, data.email, data.password);

      await updateProfile(auth.currentUser, { displayName: data.name })

      toast.success("Conta criada com sucesso!");
    } catch {
      toast.error("Erro ao criar sua conta!");
    } finally {
      setLoading(false)
    }
  }


  return (
    <FormProvider {...methods} >
      <form onSubmit={methods.handleSubmit(handleCreateUser)}>
        <div className="flex flex-col w-72 gap-y-4">
          <Title>crie a sua conta</Title>
          <Field placeholder="nome" name="name" />
          <Field placeholder="email" name="email" />
          <Field type="password" placeholder="senha" name="password" />
          <Field type="password" placeholder="confirmar senha" name="confirm_password" />

          <Button type="submit" className="mt-4">cadastrar</Button>
        </div>
      </form>
    </FormProvider>
  )
}