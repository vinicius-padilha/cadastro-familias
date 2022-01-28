import { useCallback, useEffect, useMemo } from 'react';
import { useStore } from '../store';

export function useModal() {
  const { isModalOpen, setModalOpen, setModalProps } = useStore();

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen])

  const openModal = useCallback((props) => {
    setModalOpen(true);

    setModalProps(props);
  }, [setModalOpen, setModalProps])

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        closeModal();
      }
    };

    window.addEventListener('keydown', close);

    return () => window.removeEventListener('keydown', close);
  }, [closeModal]);

  return useMemo(() => {
    return {
      isModalOpen,
      openModal,
      closeModal
    };
  }, [isModalOpen, openModal, closeModal]);
}
