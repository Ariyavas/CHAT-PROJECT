import { io } from "socket.io-client";
import { useDataStore } from "../store/store";

class SocketioService {
  socket;

  constructor() {}

  setupSocketConnection() {
    let reqdata = {};
    if (localStorage.getItem("role") == "Admin") {
      reqdata = {
        user_id: localStorage.getItem("userid"),
        room_id: "63e5ae61ee3e81f3b39272ac",
      };
    } else {
      const usedatafromstore = useDataStore();
      if (usedatafromstore.roomID != false) {
        reqdata = {
          user_id: localStorage.getItem("userid"),
          room_id: usedatafromstore.roomID,
        };
        console.log("TEST ROOMID line:24", reqdata);
      } else {
        reqdata = { user_id: localStorage.getItem("userid") };
      }
    }
    this.socket = io("http://localhost:3000", {
      query: reqdata,
    });
    // <-- connect room -->
    this.socket.on("room", (data) => {
      const usedatafromstore = useDataStore();
      console.log("room", data);
      usedatafromstore.setroom(data);
    });
    // <-- connect message -->
    this.socket.on("message", (data) => {
      const usedatafromstore = useDataStore();
      console.log("message", data);
      usedatafromstore.setmessage(data.message);
      usedatafromstore.addhistory(data.infodialog);
    });
    // <-- connect history -->
    this.socket.on("history", (data) => {
      const usedatafromstore = useDataStore();
      console.log("history", data);
      usedatafromstore.sethistory(data);
    });
    // <-- connect disconnect -->
    this.socket.on("disconnect", (data) => {
      console.log("disconnect", data);
    });
  }

  sendMessage(message) {
    if (this.socket) {
      this.socket.emit("message", message);
    }
  }

  updatehistory() {}

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();
