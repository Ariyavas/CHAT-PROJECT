import { createRoombyID, joinRoombyID } from "../services/Service_Room";
import User from "../models/model_user";
import Room from "../models/model_room";
import { messaging } from "../middleware/messagesoket";
import { MessageofRoom } from "../services/Service_Message";

const socketStart = (io: any) => {
  io.on("connection", async function (socket: any) {
    try {
      console.log(`Connected with socket_id : ${socket.id}`);
      const socket_data = socket.request._query;

      console.log(socket_data.user_id);

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
      if (socket_data.room_id == undefined) {
        const roomdata = await finddatafromDB(socket_data.user_id, "R");
        // console.log(roomdata);

        if (roomdata != null && roomdata.status == true) {
          roomid = roomdata._id.toString();
          // console.log(roomid);

          // ++TEST ZONE++ //
          messagedetail = await MessageofRoom(roomid);
          await saveconnectedtimeDB(roomid, socket_data.user_id);
          // console.log(await saveconnectedtimeDB(roomid, socket_data.user_id));
          // --END TEST ZONE-- //

          socket.join(roomid);
          io.to(roomid).emit("room", roomdata);
          socket.emit("history", messagedetail);
        } else {
          const room = await createRoombyID(socket_data.user_id, "none");

          roomid = room._id.toString();

          // ++TEST ZONE++ //
          await saveconnectedtimeDB(roomid, socket_data.user_id);
          // console.log(await saveconnectedtimeDB(roomid, socket_data.user_id));
          // --END TEST ZONE-- //

          socket.join(roomid);
          // console.log(room, room._id.toString());

          roomid = room._id.toString();
          io.to(roomid).emit("room", room);
        }
      } else {
        roomid = socket_data.room_id;

        // ++TEST ZONE++ //
        messagedetail = await MessageofRoom(roomid);
        await saveconnectedtimeDB(roomid, socket_data.user_id);
        // console.log(await saveconnectedtimeDB(roomid, socket_data.user_id));
        // --END TEST ZONE-- //

        socket.join(roomid);
        const joinroom = await joinRoombyID(roomid, socket_data.user_id);
        io.to(roomid).emit("room", joinroom);
        socket.emit("history", messagedetail);
      }
      // console.log(roomid);

      socket.on("room", function (text: any) {
        socket.emit("room", text);
      });

      socket.on("message", async function (text: any) {
        const infodialog = await messaging(roomid, socket_data.user_id, text);

        io.to(roomid).emit("message", {
          sender: socket_data.user_id,
          message: text,
          status: infodialog,
        });
      });

      socket.on("disconnect", async function () {
        let search: string = socket_data.room_id;
        let finduserroombyiduser: any;

        if (search == undefined) {
          search = socket_data.user_id;
          finduserroombyiduser = await finddatafromDB(search, "R");

          // ++TEST ZONE++ //
          await savedisconnectDB(finduserroombyiduser, socket_data.user_id);
          // console.log(
          //   await savedisconnectDB(finduserroombyiduser, socket_data.user_id)
          // );
          // --END TEST ZONE-- //
        } else {
          finduserroombyiduser = await finddatafromDB(search, "RID");

          // ++TEST ZONE++ //
          await savedisconnectDB(finduserroombyiduser, socket_data.user_id);
          // console.log(
          //   await savedisconnectDB(finduserroombyiduser, socket_data.user_id)
          // );
          // --END TEST ZONE-- //
        }

        // console.log(finduserroombyiduser);

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

    if (column == "U") {
      result = await User.findById(search);
    } else if (column == "R") {
      result = await Room.findOne({ created: search, status: true });
    } else if (column == "RID") {
      result = await Room.findOne({ _id: search });
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
