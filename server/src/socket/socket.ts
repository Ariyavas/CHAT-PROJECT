import {
  createRoombyID,
  joinRoombyID,
  showRoomUser,
} from "../services/Service_Room";
import User from "../models/model_user";
import Room from "../models/model_room";
import { messaging } from "../middleware/messagesoket";
import { MessageofRoom } from "../services/Service_Message";

const socketStart = (io: any) => {
  io.on("connection", async (socket: any) => {
    try {
      console.log(`Connected with socket_id : ${socket.id}`);
      const socket_data = socket.request._query;

      if (
        !socket_data ||
        !socket_data.user_id ||
        socket_data.user_id == undefined
      ) {
        socket.disconnect();
        return;
      }
      let roomid: string = "";
      let messagedetail: any;
      let listdataroom: any;
      if (socket_data.room_id == undefined) {
        // <== USER ==>
        const roomdata = await finddatafromDB(socket_data.user_id, "R");

        if (roomdata != null && roomdata.status == true) {
          // <-- USER HAS ROOM -->
          roomid = roomdata._id.toString();

          messagedetail = await MessageofRoom(roomid);
          await saveconnectedtimeDB(roomid, socket_data.user_id);

          socket.join(roomid);
          io.to(roomid).emit("room", roomdata);
          socket.emit("history", messagedetail);
        } else {
          // <-- CREATE ROOM -->
          const room = await createRoombyID(socket_data.user_id, "none");

          roomid = room._id.toString();

          await saveconnectedtimeDB(roomid, socket_data.user_id);

          socket.join(roomid);

          roomid = room._id.toString();
          io.to(roomid).emit("room", room);
        }
      } else {
        // <== ADMIN ==>
        roomid = socket_data.room_id;

        listdataroom = await showRoomUser();

        if (roomid == undefined || roomid == "") {
          socket.emit("room_active", listdataroom);
        } else {
          messagedetail = await MessageofRoom(roomid);
          await saveconnectedtimeDB(roomid, socket_data.user_id);
          const joinroom = await joinRoombyID(roomid, socket_data.user_id);

          socket.join(roomid);
          socket.emit("room_active", listdataroom);
          socket.emit("history", messagedetail);
          io.to(roomid).emit("room", joinroom);
        }
      }

      socket.on("room", function (text: any) {
        socket.emit("room", text);
      });

      socket.on("message", async function (text: any) {
        if (text == undefined || text == null || text == "") {
          return console.log(`not found message`);
        }
        const infodialog = await messaging(roomid, socket_data.user_id, text);

        io.to(roomid).emit("message", {
          infodialog,
        });
      });

      socket.on("disconnect", async function () {
        let search: string = socket_data.room_id;
        let finduserroombyiduser: any;

        if (search == undefined || search == "") {
          return null;
        } else {
          if (search == undefined) {
            search = socket_data.user_id;
            finduserroombyiduser = await finddatafromDB(search, "R");

            await savedisconnectDB(finduserroombyiduser, socket_data.user_id);
          } else {
            finduserroombyiduser = await finddatafromDB(search, "RID");

            await savedisconnectDB(finduserroombyiduser, socket_data.user_id);
          }
        }
        console.log(`Disconnected with socket_id : ${socket.id}`);
      });
    } catch (error: any) {
      socket.disconnect();
      console.log(error.message);
    }
  });
};

const finddatafromDB = async (search: any, column: string) => {
  try {
    let result: any;

    if (search == "empty") {
      return null;
    }

    if (column == "U") {
      result = await User.findById(search);
    } else if (column == "R") {
      result = await Room.findOne({ created: search, status: true });
    } else if (column == "RID") {
      result = await Room.findById(search);
    }

    return result;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};

const savedisconnectDB = async (data: any, user_id: string) => {
  try {
    let result: any;
    result = data;

    if (data == null) {
      return null;
    }

    result.user = result.user.map((data: any) => {
      if (user_id == data.id_user) {
        data.disconnect_time = new Date();
      }
      return data;
    });

    await result.save();

    return result;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(`Can't save disconnect_time`);
  }
};

const saveconnectedtimeDB = async (room_id: string, user_id: string) => {
  try {
    const roomdata = await Room.findById(room_id);

    let result: any = roomdata;

    result.user = result.user.map((user: any) => {
      if (user.id_user == user_id) {
        user.connect_time = new Date();
      }
      return user;
    });

    await result.save();

    return result;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(`Can't save connected_time`);
  }
};

export default socketStart;
