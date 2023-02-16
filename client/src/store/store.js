import { defineStore } from "pinia";

export const useDataStore = defineStore({
  id: "data",
  state: () => ({
    data: false,
    datahistory: [],
    roomID: false,
  }),
  actions: {
    setmessage(message) {
      this.data = message;
    },
    sethistory(history) {
      this.datahistory = history;
    },
    setroom(roomid) {
      this.roomID = roomid;
    },
    addhistory(infomessage) {
      this.datahistory.push(infomessage);
    }
  },
});
