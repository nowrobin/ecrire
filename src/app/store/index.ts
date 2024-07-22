import { create } from "zustand";

// 초기 상태 정의
interface QUOTEID {
  id: number | null;
  setQuoteId: (qutoe_id: number | null) => void;
}

const IdStore = create<QUOTEID>((set) => ({
  id: null,
  setQuoteId: (quote_id: number | null) => {
    set(() => ({ id: quote_id }));
  },
}));

export default IdStore;
