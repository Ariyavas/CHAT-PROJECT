import { io } from "socket.io-client";
import { useDataStore } from "../store/store";

class SocketioService {
  socket;

  constructor() {}

  setupSocketConnection() {
    let reqdata = {};
    const usedatafromstore = useDataStore();
    if (usedatafromstore.roomID != false) {
      reqdata = {
        user_id: localStorage.getItem("userid"),
        room_id: usedatafromstore.roomID,
      };
    } else {
      reqdata = { user_id: localStorage.getItem("userid") };
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

  setupSocketConnectionForadmin(roomid) {
    const usedatafromstore = useDataStore();

    const reqdata = {
      user_id: localStorage.getItem("userid"),
      room_id: roomid,
    };

    this.socket = io("http://localhost:3000", {
      query: reqdata,
    });

    // <-- connect room -->
    this.socket.on("room", (data) => {
      console.log("room", data);
      usedatafromstore.setroom(data);
    });
    // <-- connect message -->
    this.socket.on("message", (data) => {
      console.log("message", data);
      usedatafromstore.setmessage(data.message);
      usedatafromstore.addhistory(data.infodialog);
    });
    // <-- connect history -->
    this.socket.on("history", (data) => {
      console.log("history", data);
      usedatafromstore.sethistory(data);
    });
    //<-- connect room_active -->
    this.socket.on("room_active", (data) => {
      console.log("room_active", data);
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
