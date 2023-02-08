import { defineStore } from "pinia";

export const useDataStore = defineStore({
  id: "data",
  state: () => ({
    data: false,
    datahistory: [],
  }),
  actions: {
    setmessage(message) {
      this.data = message;
      return true;
    },
    sethistory(history) {
      this.datahistory = history;
      return true;
    },
  },
});
