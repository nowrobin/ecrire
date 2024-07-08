import { create } from "zustand";

// 초기 상태 정의
interface ID {
  id: string;
  setId: (id: string) => void;
}

const IdStore = create<ID>((set) => ({
  id: "init",
  setId: (id) => {
    set(() => ({ id: id }));
  },
}));

export default IdStore;
