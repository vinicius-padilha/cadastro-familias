import create from 'zustand'
import { produce } from 'immer'
import { persist } from 'zustand/middleware'

export const useStore = create(persist(set => ({
  isLoading: false,
  isModalOpen: false,
  userData: {},
  modalProps: {},
  setLoading: () => set(produce(state => ({ isLoading: !state.isLoading }))),
  setUserData: (data) => set(produce(() => ({ userData: data }))),
  setModalOpen: (data) => set(produce(() => ({ isModalOpen: data }))),
  setModalProps: (data) => set(produce(() => ({ modalProps: data }))),
}),
  {
    name: "main-storage",
    getStorage: () => localStorage,
    partialize: ({ userData }) => ({ userData })
  }
))