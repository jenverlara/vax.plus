import { create } from "zustand";

type NewScheduleState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewSchedule = create<NewScheduleState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
