import mongoose from "mongoose";
import QA from "../models/model_qa";
import Answer from "../models/model_answer";

const createQuestion = async (
  question: string,
  number: number,
  group: string
) => {
  try {
    const quest = new QA({
      _id: new mongoose.Types.ObjectId(),
      option: [null],
      group: group,
      number: number,
      message: question,
      create_time: new Date(),
      status: true,
    });

    await quest.save();

    return quest;
  } catch (error) {
    throw error;
  }
};

const showQuestion = async () => {
  try {
    const qa = await QA.find({});

    console.log(
      qa.map((Quest: any) => {
        Quest.option.map((e: any) => {
          return e;
        });
        return Quest;
      })
    );

    return qa;
  } catch (error) {
    throw error;
  }
};

const createAnswer = async (answer: string, questionid: string) => {
  try {
    const ans = new Answer({
      _id: new mongoose.Types.ObjectId(),
      id_question: questionid,
      message: answer,
      create_time: new Date(),
      status: true,
    });

    await ans.save();

    return ans;
  } catch (error) {
    throw error;
  }
};

const showAnswer = async () => {
  try {
    const ans = await Answer.find({});

    return ans;
  } catch (error) {
    throw error;
  }
};

export { createQuestion, showQuestion, createAnswer, showAnswer };
