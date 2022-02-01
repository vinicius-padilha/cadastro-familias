import { toast } from "react-toastify";
import { Button } from "../../components/Button";
import { Field } from "../../components/Field";
import { Title } from "../../components/Title";
import { getDatabase, ref, push, set } from "firebase/database";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

export function Register() {
  const fieldArrayLabels = {
    nome: 'nome',
    data_nascimento: 'data de nascimento',
    parentesco: 'parentesco',
    sexo: 'sexo',
  }

  const db = getDatabase();
  const methods = useForm();
  const { fields, append, remove } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "composicao_familiar", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const watchFieldArray = methods.watch("composicao_familiar");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index]
    };
  });

  const handleCreateRegister = async (data) => {
    console.log(data)
    if (!data.nome_referencia) return toast.error("O campo nome da referência do grupo familiar é obrigatório")
    if (!data.cpf) return toast.error("O campo CPF é obrigatório")
    if (!data.fone) return toast.error("O campo fone é obrigatório")
    if (!data.endereco) return toast.error("O campo endereço é obrigatório")
    if (!data.bairro) return toast.error("O campo bairro é obrigatório")
    if (!data.cidade) return toast.error("O campo cidade é obrigatório")

    try {
      const listRef = ref(db, 'familias');
      const newListRef = push(listRef);

      await set(newListRef, data);

      toast.success("Registro efetuado com sucesso, você será redirecionado para tela de listagem!")
    } catch {
      toast.error("Erro ao prosseguir com o registro!")
    }
  }

  return (
    <div>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(handleCreateRegister)}>
          <Title>cadastro</Title>
          <div className="mt-14">
            <div className="flex gap-8 mb-8">
              <Field placeholder="nome da referência do grupo familiar*" name="nome_referencia" />
              <Field placeholder="Nº NIS/PIS" className="max-w-18" name="nis_pis" />
              <Field placeholder="apelido" className="max-w-18" name="apelido" />
            </div>
            <div className="flex gap-8 mb-8">
              <Field placeholder="RG" className="max-w-18" name="rg" />
              <Field placeholder="CPF*" className="max-w-18" name="cpf" />
              <Field placeholder="nome da mãe" name="nome_mae" />
            </div>
            <div className="flex gap-8 mb-8">
              <Field placeholder="fone*" className="max-w-18" name="fone" />
              <Field placeholder="recado com" className="max-w-18" name="recado_com" />
              <Field placeholder="endereço*" name="endereco" />
              <Field placeholder="nº" className="max-w-7" name="numero" />
            </div>
            <div className="flex gap-8 mb-12">
              <Field placeholder="bairro*" className="max-w-18" name="bairro" />
              <Field placeholder="cidade*" className="max-w-18" name="cidade" />
              <Field placeholder="ponto de referência" name="ponto_referencia" />
            </div>

            <h2 className="mb-8 text-dark-jungle-green text-xl">composição familiar:</h2>

            {controlledFields.map((fields, index) => {
              return (
                <div className="flex gap-8 mb-8" key={fields.id}>
                  {Object.entries(fields).map(([key, value]) => {
                    console.log(['nome', 'data_nascimento'].includes(key))
                    return key !== 'id' && <Field key={key + fields.id} className={['data_nascimento', 'sexo'].includes(key) && 'max-w-10'} name={`composicao_familiar.${index}.${key}`} placeholder={fieldArrayLabels[key]} />;
                  })}
                  <Button type="button" variant="secondary" onClick={() => remove(index)}>remover</Button>
                </div>)
            })}
          </div>
          <div className="w-full text-center">
            <Button type="button" variant="secondary" onClick={() => append({ nome: '', data_nascimento: '', parentesco: '', sexo: '' })}>adicionar membro +</Button>
          </div>
          <div className="mt-14 w-full text-right">
            <Button type="submit">salvar</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}