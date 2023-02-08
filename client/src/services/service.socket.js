import { io } from "socket.io-client";
import { useDataStore } from "../store/store";

class SocketioService {
  datamessage = [];
  socket;

  constructor() {}

  setupSocketConnection() {
    this.socket = io("http://localhost:3000", {
      query: { user_id: localStorage.getItem("userid") },
    });
    this.socket.on("room", (data) => {
      console.log("room", data);
    });
    this.socket.on("message", (data) => {
      const usedatafromstore = useDataStore();
      console.log("message", data);
      usedatafromstore.setmessage(data.message);
    });
    this.socket.on("history", (data) => {
      const usedatafromstore = useDataStore();
      console.log("history", data);
      usedatafromstore.sethistory(data);
    });
    this.socket.on("disconnect", (data) => {
      console.log("disconnect", data);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();
