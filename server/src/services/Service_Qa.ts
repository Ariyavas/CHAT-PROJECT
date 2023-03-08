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

const addQatoDatabase = async (
  questionmassage: string,
  answermassage: any,
  group: string,
  number: number
) => {
  try {
    const quest = new QA({
      _id: new mongoose.Types.ObjectId(),
      option: [null],
      group: group,
      number: number,
      message: questionmassage,
      create_time: new Date(),
      status: true,
    });

    await quest.save();
    if (answermassage != null) {
      for (const data of answermassage) {
        const ans = new Answer({
          _id: new mongoose.Types.ObjectId(),
          id_question: quest._id,
          message: data,
          create_time: new Date(),
          status: true,
        });

        await ans.save();
      }
    }

    return { quest };
  } catch (error) {
    throw error;
  }
};

const updateAnswer = async (answer: string, questionid: string) => {
  try {
    const ans: any = await Answer.findOne({ id_question: questionid });
    ans.message = answer;

    await ans.save();

    return ans;
  } catch (error) {
    throw error;
  }
};

const showQuestionAndAnswer = async () => {
  try {
    const ans: any = await Answer.find({});
    const qa: any = await QA.find({});

    const data: any = qa.map((dataqa: any) => {
      let test = ans.map((dataans: any) => {
        let newdata: any = [];
        if (dataqa._id == dataans.id_question) {
          newdata = [
            {
              Q: dataqa.message,
              A: dataans.message,
              id_question: dataqa._id,
              id_answer: dataans._id,
            },
          ];
        }
        return newdata;
      });
      return test;
    });

    let test: any = [];

    for (let i = 0; i < data.length; i++) {
      for (let k = 0; k < data[i].length; k++) {
        if (data[i][k].length > 0) {
          test = test.concat(data[i][k]);
        }
      }
    }

    return test;
  } catch (error) {
    throw error;
  }
};

const deleteQA = async (questionid: any, answerid: any) => {
  try {
    const ans = await Answer.remove({ _id: answerid });
    const qa = await QA.remove({ _id: questionid });

    return "Delete Successful";
  } catch (error) {
    throw error;
  }
};

const searchgroup = async (message: string) => {
  const qa: any = await QA.aggregate([{ $match: { group: message } }]);
  const ans: any = await Answer.find({});

  let datatest: any = [];

  for (const itemqa of qa) {
    for (const itemans of ans) {
      if (itemqa._id == itemans.id_question) {
        datatest.push({
          Q: itemqa.message,
          A: itemans.message,
        });
      }
    }
  }

  return datatest;
};

export {
  createQuestion,
  showQuestion,
  createAnswer,
  showAnswer,
  addQatoDatabase,
  updateAnswer,
  showQuestionAndAnswer,
  deleteQA,
  searchgroup,
};
