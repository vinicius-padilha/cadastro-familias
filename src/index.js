import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from './store';
import { useModal } from './hooks/useModal';
import { Button } from './components/Button';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBtz8qzqqDWeYb9aU_0iJaX7UEMWhaOSxM",
  authDomain: "cadastro-familias.firebaseapp.com",
  databaseURL: "https://cadastro-familias-default-rtdb.firebaseio.com",
  projectId: "cadastro-familias",
  storageBucket: "cadastro-familias.appspot.com",
  messagingSenderId: "460631797423",
  appId: "1:460631797423:web:610508abbcf14c6eb02e5a"
};

initializeApp(firebaseConfig);

const Loader = () => {
  const { isLoading } = useStore();

  if (isLoading) return (
    <div className="w-screen h-screen fixed left-0 top-0 bg-black bg-opacity-25 z-50 flex items-center justify-center">
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )

  return null
}

const Modal = () => {
  const { isModalOpen, modalProps, setModalOpen } = useStore();

  const closeModal = () => setModalOpen(false);

  if (isModalOpen) return (
    <div className="fixed left-0 top-0">
      <div className="bg-black opacity-25 w-screen h-screen fixed z-10" onClick={closeModal} />
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-96 h-80 bg-white z-20 rounded-md flex items-center justify-center flex-col">
          <h2 className="mb-12 text-center text-2xl font-medium text-dark-jungle-green">tem certeza?</h2>
          <Button className="mb-4" onClick={modalProps.action}>excluir</Button>
          <Button variant="secondary" onClick={closeModal}>cancelar</Button>
        </div>
      </div>
    </div>
  )

  return null
}

ReactDOM.render(
  <React.StrictMode>
    <Modal />
    <Loader />
    <App />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
