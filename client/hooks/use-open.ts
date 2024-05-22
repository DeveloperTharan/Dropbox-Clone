import { create } from "zustand";

type OpenModelState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useOpenSearchModel = create<OpenModelState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
