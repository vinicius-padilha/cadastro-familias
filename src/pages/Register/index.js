import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../components/Button";
import { Field } from "../../components/Field";
import { Title } from "../../components/Title";
import { getDatabase, ref, push, set } from "firebase/database";

function Member(handleField) {
  return (
    <div className="flex gap-8 mb-8">
      <Field placeholder="nome" className="max-w-18" name="nome" onChange={handleField} />
      <Field placeholder="data de nascimento" name="data_nascimento" className="max-w-18" onChange={handleField} />
      <Field placeholder="parentesco" name="parentesco" onChange={handleField} />
      <Field placeholder="sexo" name="sexo" onChange={handleField} />
    </div>
  )
}

export function Register() {
  const [register, setRegister] = useState({});
  const db = getDatabase();

  const handleCreateRegister = async (e) => {
    e.preventDefault();

    if (!register.nome_referencia) return toast.error("O campo nome da referência do grupo familiar é obrigatório")
    if (!register.cpf) return toast.error("O campo CPF é obrigatório")
    if (!register.fone) return toast.error("O campo fone é obrigatório")
    if (!register.endereco) return toast.error("O campo endereço é obrigatório")
    if (!register.bairro) return toast.error("O campo bairro é obrigatório")
    if (!register.cidade) return toast.error("O campo cidade é obrigatório")

    try {
      const listRef = ref(db, 'familias');
      const newListRef = push(listRef);

      await set(newListRef, register);

      toast.success("Registro efetuado com sucesso, você será redirecionado para tela de listagem!")
    } catch {
      toast.error("Erro ao prosseguir com o registro!")
    }
  }

  const handleField = ({ target }) => {
    setRegister({ ...register, [target.name]: target.value });
  }

  const member = Member(handleField);
  const [members, setMembers] = useState([member]);

  const handleAddMember = (e) => {
    e.preventDefault()

    setMembers([...members, member])
  }

  return (
    <div>
      <form onSubmit={handleCreateRegister}>
        <Title>cadastro</Title>
        <div className="mt-14">
          <div className="flex gap-8 mb-8">
            <Field placeholder="nome da referência do grupo familiar*" name="nome_referencia" onChange={handleField} />
            <Field placeholder="Nº NIS/PIS" className="max-w-18" name="nis_pis" onChange={handleField} />
            <Field placeholder="apelido" className="max-w-18" name="apelido" onChange={handleField} />
          </div>
          <div className="flex gap-8 mb-8">
            <Field placeholder="RG" className="max-w-18" name="rg" onChange={handleField} />
            <Field placeholder="CPF*" className="max-w-18" name="cpf" onChange={handleField} />
            <Field placeholder="nome da mãe" name="nome_mae" onChange={handleField} />
          </div>
          <div className="flex gap-8 mb-8">
            <Field placeholder="fone*" className="max-w-18" name="fone" onChange={handleField} />
            <Field placeholder="recado com" className="max-w-18" name="recado_com" onChange={handleField} />
            <Field placeholder="endereço*" name="endereco" onChange={handleField} />
            <Field placeholder="nº" className="max-w-7" name="numero" onChange={handleField} />
          </div>
          <div className="flex gap-8 mb-12">
            <Field placeholder="bairro*" className="max-w-18" name="bairro" onChange={handleField} />
            <Field placeholder="cidade*" className="max-w-18" name="cidade" onChange={handleField} />
            <Field placeholder="ponto de referência" name="ponto_referencia" onChange={handleField} />
          </div>

          <h2 className="mb-8 text-dark-jungle-green text-xl">composição familiar</h2>

          {members}

        </div>
        <div className="w-full text-center">
          <Button variant="secondary" onClick={handleAddMember}>adicionar membro +</Button>
        </div>
        <div className="mt-14 w-full text-right">
          <Button type="submit">salvar</Button>
        </div>
      </form>
    </div>
  )
}