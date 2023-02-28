import { NextFunction, Request, Response } from "express";
import {
  createQuestion,
  showQuestion,
  createAnswer,
  showAnswer,
} from "../services/Service_Qa";

const Questionrequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { question, number, group } = req.body;
  createQuestion(question, number, group)
    .then((data: any) => {
      res.status(200).json({ data: data });
    })
    .catch((err: any) => {
      res.status(500).json({ err: err.message });
    });
};

const ShowFAQs = async (req: Request, res: Response, next: NextFunction) => {
  showQuestion()
    .then((data: any) => {
      res.status(200).json({ data: data });
    })
    .catch((err: any) => {
      res.status(500).json({ err: err.message });
    });
};

const Answerrequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { answer, questionid } = req.body;
  createAnswer(answer, questionid)
    .then((data: any) => {
      res.status(200).json({ data: data });
    })
    .catch((err: any) => {
      res.status(500).json({ err: err.message });
    });
};

const ShowAns = async (req: Request, res: Response, next: NextFunction) => {
  showAnswer()
    .then((data: any) => {
      res.status(200).json({ data: data });
    })
    .catch((err: any) => {
      res.status(500).json({ err: err.message });
    });
};
export { Questionrequest, ShowFAQs, Answerrequest, ShowAns };
