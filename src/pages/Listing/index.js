import { Table } from "../../components/Table";
import { Title } from "../../components/Title";
import { Toolbar } from "../../components/Toolbar";
import { useModal } from "../../hooks/useModal";
import { useEffect, useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { useStore } from "../../store";

const columns =  [
  {
    Header: 'Nome referência',
    accessor: 'nome_referencia',
  },
  {
    Header: 'CPF',
    accessor: 'cpf',
  },
  {
    Header: 'Bairro',
    accessor: 'bairro',
  },
  {
    Header: 'Fone',
    accessor: 'fone',
  },
]

export function Listing() {
  const { openModal } = useModal();
  const dbRef = ref(getDatabase());
  const [data, setData] = useState([]);
  const { setLoading } = useStore();

  useEffect(() => {
    setLoading(true);

    get(child(dbRef, `familias`)).then((snapshot) => {
      if (snapshot.exists()) {
        let snapshotList = [];

        snapshot.forEach((item) => {
          snapshotList.push({key: item.key, ...item.val()})
        });

        setData(snapshotList) 
      } else {  
        console.log("No data available");
      } 
    }).catch((error) => { 
      console.error(error);
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  return (
    <div>
      <Title>listagem</Title>
      <Toolbar />
      <div className="mt-8">
        <Table columns={columns} data={data} />
      </div>
    </div>
  )
}