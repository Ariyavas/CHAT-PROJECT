import { NextFunction, Request, Response } from "express";
import {
  createRoombyID,
  updatestatusRoombyID,
  joinRoombyID,
  showRoomUser,
} from "../services/Service_Room";

const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  const { topic } = req.body;
  createRoombyID(user_id, topic)
    .then((data: any) => {
      res.status(200).json({ data: data });
    })
    .catch((err: any) => {
      res.status(500).json({ err: err.message });
    });
};

const showroom = async (req: Request, res: Response, next: NextFunction) => {
  showRoomUser()
    .then((data: any) => {
      res.status(200).json({ data: data });
    })
    .catch((err: any) => {
      res.status(500).json({ err: err.message });
    });
};

const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
  const { room_id } = req.params;
  const { status } = req.body;
  updatestatusRoombyID(room_id, status)
    .then((data: any) => {
      res.status(200).json({ data: data });
    })
    .catch((err: any) => {
      res.status(503).json({ err: err.message });
    });
};

const joinRoom = async (req: Request, res: Response, next: NextFunction) => {
  const { room_id } = req.params;
  const { user_id } = req.body;
  joinRoombyID(room_id, user_id)
    .then((data: any) => {
      res.status(200).json({ data: data });
    })
    .catch((err: any) => {
      console.log(err.message);
      res.status(503).json({ err: err.message });
    });
};

export { createRoom, updateRoom, joinRoom, showroom };
