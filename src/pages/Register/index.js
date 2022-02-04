/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import { Button } from "../../components/Button";
import { Field } from "../../components/Field";
import { Title } from "../../components/Title";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "../../store";

export function Register() {
  const db = getFirestore();
  const navigate = useNavigate();
  const location = useLocation()
  const params = useParams()
  const [mode, setMode] = useState('register');
  const methods = useForm();
  const { setValue } = methods;
  const { setLoading } = useStore()

  useEffect(() => {
    if (location.pathname.includes('edit')) setMode('edit');

    if (location.pathname.includes('view')) setMode('view');

    if (params.id) {

      (async () => {
        setLoading(true)

        try {
          const docSnap = await getDoc(doc(db, "familias", params.id));

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            Object.entries(docSnap.data()).map(([key, value]) => {
              setValue(key, value, {
                shouldDirty: true,
                shouldValidate: true,
              });

              return '';
            });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        } finally {
          setLoading(false)
        }
        // let snapshotList = [];

        // querySnapshot.forEach((doc) => {
        //   snapshotList.push({ key: doc.id, ...doc.data() })
        // });

        // console.log(snapshotList)
      })()
    }

  }, [location, params])

  const fieldArrayLabels = {
    nome: 'nome',
    data_nascimento: 'data de nascimento',
    parentesco: 'parentesco',
    sexo: 'sexo',
  }

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
    if (!data.nome_referencia) return toast.error("O campo nome da referência do grupo familiar é obrigatório")
    if (!data.cpf) return toast.error("O campo CPF é obrigatório")
    if (!data.fone) return toast.error("O campo fone é obrigatório")
    if (!data.endereco) return toast.error("O campo endereço é obrigatório")
    if (!data.bairro) return toast.error("O campo bairro é obrigatório")
    if (!data.cidade) return toast.error("O campo cidade é obrigatório")

    if (mode === 'edit') {
      try {
        setLoading(true)

        await setDoc(doc(db, "familias", params.id), data);
        
        toast.success("Registro atualizado com sucesso, você será redirecionado para tela de listagem!")
        
        setTimeout(() => {
          navigate("/", { replace: true })
        }, 1500);
      } catch {
        toast.error("Erro ao prosseguir com a atualização do registro!")
      } finally {
        setLoading(false)
      }
    } else {

      try {
        setLoading(true)
        
        await addDoc(collection(db, "familias"), data);
        
        toast.success("Registro efetuado com sucesso, você será redirecionado para tela de listagem!")
        
        setTimeout(() => {
          navigate("/", { replace: true })
        }, 1500);
      } catch {
        toast.error("Erro ao prosseguir com o registro!")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(handleCreateRegister)}>
          <Title>cadastro</Title>
          <div className="mt-14">
            <div className="flex gap-8 mb-8">
              <Field {...(mode === 'view' && { readOnly: true })} placeholder="nome da referência do grupo familiar*" name="nome_referencia" />
              <Field {...(mode === 'view' && { readOnly: true })} placeholder="Nº NIS/PIS" className="max-w-18" name="nis_pis" />
              <Field {...(mode === 'view' && { readOnly: true })} placeholder="apelido" className="max-w-18" name="apelido" />
            </div>
            <div className="flex gap-8 mb-8">
              <Field {...(mode === 'view' && { readOnly: true })} placeholder="RG" className="max-w-18" name="rg" />
              <Field {...(mode === 'view' && { readOnly: true })} placeholder="CPF*" className="max-w-18" name="cpf" />
              <Field {...(mode === 'view' && { readOnly: true })} placeholder="nome da mãe" name="nome_mae" />
            </div>
            <div className="flex gap-8 mb-8">
              <Field {...(mode === 'view' && { readOnly: true })} placeholder="fone*" className="max-w-18" name="fone" />
              <Field {...(mode === 'view' && { readOnly: true })} placeholder="recado com" className="max-w-18" name="recado_com" />
              <Field {...(mode === 'view' && { readOnly: true })} placeholder="endereço*" name="endereco" />
              <Field {...(mode === 'view' && { readOnly: true })} placeholder="nº" className="max-w-7" name="numero" />
            </div>
            <div className="flex gap-8 mb-12">
              <Field {...(mode === 'view' && { readOnly: true })} placeholder="bairro*" className="max-w-18" name="bairro" />
              <Field {...(mode === 'view' && { readOnly: true })} placeholder="cidade*" className="max-w-18" name="cidade" />
              <Field {...(mode === 'view' && { readOnly: true })} placeholder="ponto de referência" name="ponto_referencia" />
            </div>

            <h2 className="mb-8 text-dark-jungle-green text-xl">composição familiar:</h2>

            {controlledFields.map((fields, index) => {
              return (
                <div className="flex gap-8 mb-8" key={fields.id}>
                  {Object.entries(fields).map(([key, value]) => {
                    console.log(['nome', 'data_nascimento'].includes(key))
                    return key !== 'id' && <Field {...(mode === 'view' && { readOnly: true })} key={key + fields.id} className={['data_nascimento', 'sexo'].includes(key) && 'max-w-10'} name={`composicao_familiar.${index}.${key}`} placeholder={fieldArrayLabels[key]} />;
                  })}
                  {mode !== 'view' && <Button type="button" variant="secondary" onClick={() => remove(index)}>remover</Button>}
                </div>)
            })}
          </div>
          <div className="w-full text-center">
            {mode !== 'view' && <Button type="button" variant="secondary" onClick={() => append({ nome: '', data_nascimento: '', parentesco: '', sexo: '' })}>adicionar membro +</Button>}
          </div>
          <div className="mt-14 w-full text-right">
            {mode !== 'view' && <Button type="submit">salvar</Button>}
          </div>
        </form>
      </FormProvider>
    </div>
  )
}