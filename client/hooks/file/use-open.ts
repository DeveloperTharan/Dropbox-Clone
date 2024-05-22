import { create } from "zustand";

type OpenModelState = {
  id?: string | null;
  folderId?: string | null;
  isOpen: boolean;
  onOpen: (id: string | null, folderId: string | null) => void;
  onClose: () => void;
};

export const useOpenRenameModel = create<OpenModelState>((set) => ({
  isOpen: false,
  onOpen: (id: string | null, folderId: string | null) =>
    set({ isOpen: true, id, folderId }),
  onClose: () => set({ isOpen: false, id: null }),
}));

export const useOpenDeleteModel = create<OpenModelState>((set) => ({
  isOpen: false,
  onOpen: (id: string | null) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false }),
}));
