/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from "../../components/Table";
import { Title } from "../../components/Title";
import { Toolbar } from "../../components/Toolbar";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "../../store";
import { collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";

const columns = [
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
  const db = getFirestore();
  const [data, setData] = useState([]);
  const { setLoading } = useStore();
  const { openModal, closeModal } = useModal()
  const navigate = useNavigate()

  const getList = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "familias"));
      let snapshotList = [];

      querySnapshot.forEach((doc) => {
        snapshotList.push({ key: doc.id, ...doc.data() })
      });

      setData(snapshotList)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [db])

  useEffect(() => {
    setLoading(true);

    getList();
  }, [db, getList]);

  const handleDelete = async (key) => {
    closeModal()
    setLoading(true);
    
    try {
      await deleteDoc(doc(db, "familias", key));
      
      getList();
    } catch {
      toast.error('Erro ao excluir registro!')

      setLoading(false);
    }
  };

  const openModalDelete = (data) => {
    openModal({ action: () => handleDelete(data.key)})
  }

  return (
    <div>
      <Title>listagem</Title>
      <Toolbar />
      <div className="mt-8">
        <Table columns={columns} data={data} onView={({ original }) => navigate(`/register/view/${original.key}`)} onEdit={({ original }) => navigate(`/register/edit/${original.key}`)} onDelete={({ original }) => openModalDelete(original)} />
      </div>
    </div>
  )
}